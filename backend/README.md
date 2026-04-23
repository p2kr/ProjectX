# Backend

Spring Boot 3.2 (Java 17, Maven). Exposes a JSON API on port **8080**.

## Run

```bash
./mvnw spring-boot:run        # or: mvn spring-boot:run
./mvnw test                   # JUnit 6 + Spring Test
./mvnw clean package          # produces target/backend-0.0.1-SNAPSHOT.jar
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Testing

JUnit 6 is pinned via the `junit-bom` import in `pom.xml`, overriding the
JUnit 5 versions Spring Boot 3.2 ships with by default. Spring Test, Mockito,
and AssertJ still come from `spring-boot-starter-test` (JUnit Jupiter is
excluded from that starter to avoid two JUnit lines on the classpath).

```
src/test/java/com/example/demo/
├── HelloControllerTest.java   @WebMvcTest (Spring slice)
└── dto/MessageDtoTest.java    Pure unit + parameterized
```

> Don't have a Maven wrapper yet? Run once: `mvn -N io.takari:maven:wrapper`
> (or just use a system-installed `mvn`).

## Endpoints

| Method | Path           | Returns                                           |
| ------ | -------------- | ------------------------------------------------- |
| GET    | `/api/hello`   | `{ message, timestamp }` greeting (`?name=` opt.) |
| GET    | `/api/health`  | Lightweight liveness response                     |
| GET    | `/actuator/health` | Spring Actuator health                        |

## Layout

```
src/main/java/com/example/demo/
├── DemoApplication.java
├── config/CorsConfig.java       Allows http://localhost:5173 in dev
├── controller/HelloController.java
├── dto/MessageDto.java          Response record (matches FE type)
└── service/                     (empty — add services here)
```

## CORS

`CorsConfig` whitelists the Vite dev server (`http://localhost:5173`).
Update `allowedOrigins` for staging / production deploys, or front the API
behind the same origin as the SPA.
