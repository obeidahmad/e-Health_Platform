FROM maven:3.9.0-amazoncorretto-17 as builder

WORKDIR /pharmacy

COPY ./Pharmacy ./Pharmacy
COPY ./SQLDatabasePersistence ./SQLDatabasePersistence
COPY ./MavenPOMs/pharmacy-pom.xml ./pom.xml

RUN mvn clean install -DskipTests

FROM amazoncorretto:17
COPY --from=builder "/pharmacy/Pharmacy/target/Pharmacy-0.0.1-SNAPSHOT.jar" app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
