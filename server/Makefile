LOCAL_BIN:=$(CURDIR)/bin

.DEFAULT_GOAL:=help
.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: build
build: # Build the application
	@echo "Building..."
	@go build -o main cmd/api/main.go

.PHONY: run
run: # Run the application
	@go run cmd/api/main.go

.PHONY: format
format: # Format the code
	@echo "Formatting..."
	@go fmt ./...
	@$(LOCAL_BIN)/swag fmt

.PHONY: install-deps
install-deps: # Install  dependencies (not go modules)
	@mkdir -p $(LOCAL_BIN)
	@GOBIN=$(LOCAL_BIN) go install github.com/air-verse/air@latest # air
	@GOBIN=$(LOCAL_BIN) go install github.com/swaggo/swag/cmd/swag@latest # swagger


.PHONY: docker-run
docker-run: # Run docker compose
	@if docker compose up --build 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose up --build; \
	fi

.PHONY: docker-down
docker-down: # Stop docker compose
	@if docker compose down 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose down; \
	fi


.PHONY: test
test: # Run the tests
	@echo "Testing..."
	@go test ./... -v


.PHONY: watch
watch: # Run the app in live-reloading mode (dev)
	@echo "Watching...";\
	$(LOCAL_BIN)/air; \


.PHONY: swagger
swagger: # Generate swagger docs
	@echo "Generating swagger docs..."
	$(LOCAL_BIN)/swag init -g cmd/api/main.go --output ./swagger


.PHONY: clean
clean: # Clean the binary
	@echo "Cleaning..."
	@rm -f main

$(VERBOSE).SILENT: