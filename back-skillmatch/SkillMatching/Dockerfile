FROM maven AS build
WORKDIR /app/myapp
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

# Définitir la répertoire de travaille
WORKDIR /app

EXPOSE 8080

# Copie du fichier JAR généré depuis l'étape de construction
COPY --from=build /app/myapp/target/SkillMatching-0.0.1-SNAPSHOT.jar SkillMatching-0.0.1-SNAPSHOT.jar

# Commande à exécuter lors du démarrage du conteneur
ENTRYPOINT ["java","-jar","SkillMatching-0.0.1-SNAPSHOT.jar"]