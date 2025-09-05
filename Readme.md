# Application tracker application

## Set-up and start
With the following command the images will be rebuild and application will start running in the background.

``docker-compose up --build -d``

Start minikube: ``minikube start``
Use docker env: ``eval $(minikube docker-env)  # On PowerShell use: minikube docker-env --shell powershell | Invoke-Expression``

Mount directories:
- minikube mount 'D:\Dokumente\Eigene Dateien\Projekte\application_tracker\django:/django'

Start application: ``kubectl apply -f k8s-dev-app.yaml``
Expose frontend port: ``minikube service angular-frontend --url``
Optional: Expose database port: ``kubectl port-forward service/mysql 3306:3306 ``

