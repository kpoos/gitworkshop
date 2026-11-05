#!/usr/bin/env bash
# Git Workshop - Install & Management Script
# Usage: ./install.sh [start|stop|restart|status|logs|help]

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="git-workshop"
COMPOSE_FILE="docker-compose.yml"
CONTAINER_NAME="git-workshop"
HOST_PORT=3000
HEALTH_CHECK_URL="http://localhost:${HOST_PORT}/api/health"
MAX_WAIT_SECONDS=60

# Helper functions
print_header() {
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  ${GREEN}Git Workshop - Container Management${NC}                    ${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo
}

print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${CYAN}ℹ${NC} $1"
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        echo "  Visit: https://docs.docker.com/get-docker/"
        exit 1
    fi

    if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        echo "  Visit: https://docs.docker.com/compose/install/"
        exit 1
    fi

    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker first."
        exit 1
    fi

    print_success "Docker and Docker Compose are available"
}

get_compose_cmd() {
    if command -v docker compose &> /dev/null; then
        echo "docker compose"
    else
        echo "docker-compose"
    fi
}

build_image() {
    print_step "Building Docker image..."
    local compose_cmd=$(get_compose_cmd)
    if $compose_cmd -f "$COMPOSE_FILE" build --no-cache; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
}

start_container() {
    print_step "Starting container..."
    local compose_cmd=$(get_compose_cmd)
    
    # Check if container already exists and is running
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_warning "Container '${CONTAINER_NAME}' is already running"
        show_access_info
        return 0
    fi
    
    # Check if container exists but stopped
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_step "Container exists but stopped. Starting it..."
        $compose_cmd -f "$COMPOSE_FILE" start
    else
        print_step "Creating and starting new container..."
        $compose_cmd -f "$COMPOSE_FILE" up -d
    fi
    
    wait_for_health
    show_access_info
}

wait_for_health() {
    print_step "Waiting for application to be ready..."
    local elapsed=0
    local interval=2
    
    while [ $elapsed -lt $MAX_WAIT_SECONDS ]; do
        if curl -sf "$HEALTH_CHECK_URL" &> /dev/null; then
            print_success "Application is healthy and ready!"
            return 0
        fi
        sleep $interval
        elapsed=$((elapsed + interval))
        echo -n "."
    done
    
    echo
    print_warning "Health check timeout. Container may still be starting."
    print_info "Check logs with: ./install.sh logs"
}

stop_container() {
    print_step "Stopping container..."
    local compose_cmd=$(get_compose_cmd)
    
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        $compose_cmd -f "$COMPOSE_FILE" stop
        print_success "Container stopped"
    else
        print_warning "Container is not running"
    fi
}

restart_container() {
    print_step "Restarting container..."
    stop_container
    sleep 2
    start_container
}

show_status() {
    print_header
    echo -e "${CYAN}Container Status:${NC}"
    echo "────────────────────────────────────────────────────────────"
    
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_success "Container is RUNNING"
        echo
        docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo
        show_access_info
    elif docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_warning "Container EXISTS but is STOPPED"
        docker ps -a --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        print_info "Container does not exist yet"
        echo "Run './install.sh start' to create and start it"
    fi
    
    echo
    echo -e "${CYAN}Docker Image:${NC}"
    echo "────────────────────────────────────────────────────────────"
    docker images --filter "reference=${PROJECT_NAME}*" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
}

show_logs() {
    local compose_cmd=$(get_compose_cmd)
    print_step "Showing container logs (press Ctrl+C to exit)..."
    $compose_cmd -f "$COMPOSE_FILE" logs -f --tail=100
}

show_access_info() {
    echo
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}  ${CYAN}🎉 Git Workshop is ready!${NC}                                 ${GREEN}║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}Web Interface:${NC}     http://localhost:${HOST_PORT}              ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}Health Check:${NC}      http://localhost:${HOST_PORT}/api/health         ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}API Endpoint:${NC}      http://localhost:${HOST_PORT}/api              ${GREEN}║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║${NC}  ${CYAN}Useful Commands:${NC}                                           ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}./install.sh status${NC}   - Show container status            ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}./install.sh logs${NC}     - View live container logs        ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}./install.sh stop${NC}     - Stop the container               ${GREEN}║${NC}"
    echo -e "${GREEN}║${NC}  ${YELLOW}./install.sh restart${NC}  - Restart the container            ${GREEN}║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo
    print_info "The workspace is persisted in a Docker volume (git-workshop-data)"
    print_info "Your git repositories and progress will survive container restarts"
}

cleanup() {
    print_step "Cleaning up..."
    local compose_cmd=$(get_compose_cmd)
    
    read -p "This will remove the container and volumes. Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        $compose_cmd -f "$COMPOSE_FILE" down -v
        print_success "Container and volumes removed"
    else
        print_info "Cleanup cancelled"
    fi
}

show_help() {
    print_header
    echo -e "${CYAN}Usage:${NC} ./install.sh [COMMAND]"
    echo
    echo -e "${CYAN}Commands:${NC}"
    echo "  ${YELLOW}start${NC}      Build image (if needed) and start the container"
    echo "  ${YELLOW}stop${NC}       Stop the running container"
    echo "  ${YELLOW}restart${NC}    Restart the container"
    echo "  ${YELLOW}status${NC}     Show container status and access information"
    echo "  ${YELLOW}logs${NC}       View live container logs"
    echo "  ${YELLOW}cleanup${NC}    Remove container and volumes (destructive!)"
    echo "  ${YELLOW}help${NC}       Show this help message"
    echo
    echo -e "${CYAN}Examples:${NC}"
    echo "  ./install.sh start      # First time setup + start"
    echo "  ./install.sh status     # Check if running and get URLs"
    echo "  ./install.sh logs       # Debug issues"
    echo "  ./install.sh stop       # Stop when done"
    echo
    echo -e "${CYAN}Ports:${NC}"
    echo "  ${HOST_PORT} → Container port 3000 (Web UI)"
    echo
    echo -e "${CYAN}Data Persistence:${NC}"
    echo "  Workspace data is stored in Docker volume 'git-workshop-data'"
    echo "  Survives container restarts and recreation"
}

# Main script logic
main() {
    local command="${1:-help}"
    
    case "$command" in
        start)
            print_header
            check_docker
            build_image
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