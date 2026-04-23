# syntax=docker/dockerfile:1.7

############################
# 1. Build stage
############################
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /workspace

# Cache dependencies first
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Copy sources and build a fat jar (skip tests for image build; CI runs them)
COPY src ./src
RUN mvn -B -q clean package -DskipTests \
 && cp target/*.jar app.jar

############################
# 2. Runtime stage
############################
FROM eclipse-temurin:17-jre-jammy AS runtime

# Run as a non-root user
RUN groupadd --system spring && useradd --system --gid spring --home /app spring
WORKDIR /app

COPY --from=build --chown=spring:spring /workspace/app.jar /app/app.jar

USER spring

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
ENV SERVER_PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health | grep -q '"status":"UP"' || exit 1

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]
