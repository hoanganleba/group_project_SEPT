#FROM openjdk:16-alpine
#WORKDIR /app
#COPY . ./
#ENV JAVA_HOME /opt/openjdk-16
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "/app/target/online-booking-system-0.0.1-SNAPSHOT.jar"]

FROM maven:3.6.3-jdk-8-slim
WORKDIR /app
COPY . ./

ENV JAVA_HOME /usr/local/openjdk-8
ENV MAVEN_HOME /usr/share/maven
EXPOSE 8080

RUN mvn clean
RUN mvn install -DskipTests
RUN mvn test

ENTRYPOINT ["mvn", "spring-boot:run"]