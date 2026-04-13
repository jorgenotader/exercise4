# Updated Django Project Notes

## Repository and IP used
- GitHub repository: https://github.com/jorgenotader/exercise4
- EC2 public IP: 35.174.138.151

## Files updated
- `Jenkinsfile`
- `Jenkinsfile_bak`
- `hello_world/settings.py`
- `nginx.conf`
- `readme`
- `polls/static/polls/style.css`
- `polls/templates/polls/index.html`
- `polls/templates/polls/detail.html`
- `polls/templates/polls/results.html`

## Important note for Docker
`Jenkinsfile` currently uses:
- `DOCKER_IMAGE = 'jorgenotader/exercise4'`

If your Docker Hub repository has a different name, change only that line.

## Suggested project path on EC2
```bash
/home/ubuntu/pythonprojects/django_polls
```

## Jenkins credentials you need
- `ec2-ssh-private-key` -> your EC2 private key in Jenkins credentials
- `docker-hub-credentials` -> your Docker Hub username and password/token

## For the easier option
Use `Jenkinsfile_bak` logic if you want the development-server style deployment flow.

## For the Docker option
Use `Jenkinsfile` and make sure Docker is installed on:
- Jenkins server
- EC2 instance
