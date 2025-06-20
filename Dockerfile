FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Find and rename the JAR file to app.jar for easier reference
RUN find target -name "*.jar" -exec cp {} app.jar \;

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]