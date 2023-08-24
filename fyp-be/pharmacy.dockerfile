FROM maven:3.9.0-amazoncorretto-17 as builder

WORKDIR /app

COPY ./Pharmacy ./Pharmacy
COPY ./SQLDatabasePersistence ./SQLDatabasePersistence
COPY _MavenPOMs/pharmacy-pom.xml ./pom.xml

RUN mvn clean install -DskipTests

FROM amazoncorretto:17.0.8
COPY --from=builder "/app/Pharmacy/target/Pharmacy-0.0.1-SNAPSHOT.jar" app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
