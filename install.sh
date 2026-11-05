#!/usr/bin/env bash
# Git Workshop - Install & Management Script
# Usage: ./install.sh [start|stop|restart|status|logs|help]

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE_FILE="$SCRIPT_DIR/docker-compose.yml"
CONTAINER_NAME="git-workshop"
HOST_PORT=3000
HEALTH_CHECK_URL="http://localhost:${HOST_PORT}/api/health"
MAX_WAIT_SECONDS=60
BOX_WIDTH=64
COMPOSE=()

# Only emit ANSI colors to an interactive terminal; NO_COLOR is respected.
RED=""
GREEN=""
YELLOW=""
BLUE=""
CYAN=""
BOLD=""
NC=""
if [[ -t 1 && -z "${NO_COLOR:-}" ]]; then
    RED=$'\033[0;31m'
    GREEN=$'\033[0;32m'
    YELLOW=$'\033[1;33m'
    BLUE=$'\033[0;34m'
    CYAN=$'\033[0;36m'
    BOLD=$'\033[1m'
    NC=$'\033[0m'
fi

# Helper functions
box_border() {
    local line
    printf -v line '%*s' "$BOX_WIDTH" ''
    line=${line// /-}
    printf '%s+%s+%s\n' "$CYAN" "$line" "$NC"
}

box_row() {
    local text="$1"
    local color="${2:-}"
    local inner_width=$((BOX_WIDTH - 2))
    local padding=$((inner_width - ${#text}))
    if (( padding < 0 )); then
        print_error "Box text is wider than ${inner_width} characters: $text"
        return 1
    fi
    printf '%s|  %s%-*s%s|%s\n' "$CYAN" "$color" "$inner_width" "$text" "$CYAN" "$NC"
}

box_row_centered() {
    local text="$1"
    local color="${2:-}"
    local padding=$(( (BOX_WIDTH - 2 - ${#text}) / 2 ))
    printf -v text '%*s%s' "$padding" '' "$text"
    box_row "$text" "$color"
}

print_header() {
    box_border
    box_row_centered "Git Workshop - Container Management" "$GREEN$BOLD"
    box_border
    printf '\n'
}

print_step() {
    printf '%s[>]%s %s\n' "$BLUE" "$NC" "$1"
}

print_success() {
    printf '%s[OK]%s %s\n' "$GREEN" "$NC" "$1"
}

print_warning() {
    printf '%s[WARN]%s %s\n' "$YELLOW" "$NC" "$1"
}

print_error() {
    printf '%s[ERROR]%s %s\n' "$RED" "$NC" "$1" >&2
}

print_info() {
    printf '%s[INFO]%s %s\n' "$CYAN" "$NC" "$1"
}

check_docker() {
    if ! command -v docker >/dev/null 2>&1; then
        print_error "Docker is not installed. Please install Docker first."
        printf '  Visit: https://docs.docker.com/get-docker/\n'
        return 1
    fi

    if docker compose version >/dev/null 2>&1; then
        COMPOSE=(docker compose)
    elif command -v docker-compose >/dev/null 2>&1; then
        COMPOSE=(docker-compose)
    else
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        printf '  Visit: https://docs.docker.com/compose/install/\n'
        return 1
    fi

    if ! command -v curl >/dev/null 2>&1; then
        print_error "curl is required for the application health check."
        return 1
    fi

    if ! docker info >/dev/null 2>&1; then
        print_error "Docker daemon is not running. Please start Docker first."
        return 1
    fi

    print_success "Docker and Docker Compose are available"
}

compose() {
    "${COMPOSE[@]}" -f "$COMPOSE_FILE" "$@"
}

start_container() {
    if docker ps --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
        print_info "Container is already running; checking application readiness..."
    else
        print_step "Building (if needed) and starting the container..."
        if ! compose up -d --build; then
            print_error "Failed to start the container"
            return 1
        fi
    fi

    if ! wait_for_health; then
        print_error "Application did not become ready. Recent container logs:"
        compose logs --tail=50
        return 1
    fi
    show_access_info
}

wait_for_health() {
    print_step "Waiting for application to be ready..."
    local elapsed=0
    local interval=2

    while (( elapsed < MAX_WAIT_SECONDS )); do
        if curl --fail --silent "$HEALTH_CHECK_URL" >/dev/null 2>&1; then
            if (( elapsed > 0 )); then
                printf '\n'
            fi
            print_success "Application is healthy and ready!"
            return 0
        fi
        sleep "$interval"
        elapsed=$((elapsed + interval))
        printf '.'
    done

    printf '\n'
    print_error "Health check timed out after ${MAX_WAIT_SECONDS} seconds."
    return 1
}

stop_container() {
    print_step "Stopping container..."
    if docker ps --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
        if ! compose stop; then
            print_error "Failed to stop the container"
            return 1
        fi
        print_success "Container stopped"
    else
        print_warning "Container is not running"
    fi
}

restart_container() {
    print_step "Restarting container..."
    stop_container || return 1
    sleep 2
    start_container
}

show_status() {
    box_border
    box_row "Container status" "$BOLD"
    box_border

    if docker ps --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
        print_success "Container is RUNNING"
        echo
        docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo
        show_access_info
    elif docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
        print_warning "Container EXISTS but is STOPPED"
        docker ps -a --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        print_info "Container does not exist yet"
        printf "Run './install.sh start' to create and start it\n"
    fi

    printf '\n'
    box_border
    box_row "Docker images for this Compose project" "$BOLD"
    box_border
    if ! compose images; then
        print_error "Unable to list Compose images"
        return 1
    fi
}

show_logs() {
    print_step "Showing container logs (press Ctrl+C to exit)..."
    compose logs -f --tail=100
}

show_access_info() {
    printf '\n'
    box_border
    box_row_centered "Git Workshop is ready" "$GREEN$BOLD"
    box_border
    box_row "Web interface: http://localhost:${HOST_PORT}"
    box_row "Health check:  ${HEALTH_CHECK_URL}"
    box_row "API:           http://localhost:${HOST_PORT}/api"
    box_border
    box_row "Commands: ./install.sh status | logs | stop | restart"
    box_row "Workspace data persists in the git-workshop-data volume"
    box_border
}

cleanup() {
    print_step "Cleaning up..."

    if ! read -r -p "This will remove the container and volumes. Are you sure? (y/N) " REPLY; then
        REPLY=""
    fi
    printf '\n'
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if ! compose down -v; then
            print_error "Cleanup failed"
            return 1
        fi
        print_success "Container and volumes removed"
    else
        print_info "Cleanup cancelled"
    fi
}

show_help() {
    print_header
    printf '%sUsage:%s ./install.sh [COMMAND]\n\n' "$CYAN" "$NC"
    printf '%sCommands:%s\n' "$CYAN" "$NC"
    printf '  %sstart%s      Build (if needed) and start the container\n' "$YELLOW" "$NC"
    printf '  %sstop%s       Stop the running container\n' "$YELLOW" "$NC"
    printf '  %srestart%s    Restart the container\n' "$YELLOW" "$NC"
    printf '  %sstatus%s     Show container status and access information\n' "$YELLOW" "$NC"
    printf '  %slogs%s       Follow container logs\n' "$YELLOW" "$NC"
    printf '  %scleanup%s    Remove the container and data volume (destructive)\n' "$YELLOW" "$NC"
    printf '  %shelp%s       Show this help message\n\n' "$YELLOW" "$NC"
    printf '%sExamples:%s\n' "$CYAN" "$NC"
    printf '  ./install.sh start\n'
    printf '  ./install.sh status\n'
    printf '  ./install.sh logs\n'
    printf '  ./install.sh stop\n\n'
    printf '%sAccess:%s http://localhost:%s (bound to this machine only)\n' "$CYAN" "$NC" "$HOST_PORT"
    printf '%sData:%s Workspace persists in the Docker volume git-workshop-data\n' "$CYAN" "$NC"
}

# Main script logic
main() {
    local command="${1:-help}"
    
    case "$command" in
        start)
            print_header
            check_docker
            start_container
            ;;
        stop)
            print_header
            check_docker
            stop_container
            ;;
        restart)
            print_header
            check_docker
            restart_container
            ;;
        status)
            print_header
            check_docker
            show_status
            ;;
        logs)
            print_header
            check_docker
            show_logs
            ;;
        cleanup)
            print_header
            check_docker
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo
            show_help
            exit 1
            ;;
    esac
}

main "$@"