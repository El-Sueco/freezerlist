FROM amazoncorretto:11
EXPOSE 8080
ARG JAR_FILE=backend/target/backend-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]