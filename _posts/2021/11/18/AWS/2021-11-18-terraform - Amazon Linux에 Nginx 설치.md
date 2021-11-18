---
layout: post
title: "[AWS] terraform - Amazon Linux에 Nginx 설치"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

**관련글**

[2021.03.11 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Windows Terraform Infra(1)](https://honeywater97.tistory.com/87)

[2021.03.12 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Windows Terraform 서버 (2)](https://honeywater97.tistory.com/88)

[2021.03.15 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Linux Apache & Tomcat 설치 (3-1)](https://honeywater97.tistory.com/90)

Apache로 너무 고장이 잘나서 Nginx로 갈아탔다.

이번엔 컴파일로 깝치지 않고 yum으로 설치했다.

 



## Amazon Linux에 Nginx 설치



```
sudo -i
yum -y update
```

항상 처음에는 root 권한으로 yum -y update를 진행한다.

 

```
# CentOS에서 yum으로 설치
yum install nginx
```

해당 명령어를 통해 설치를 하려고 하면, nginx를 설치하는 다른 명령어를 알려준다.

 

```
amazon-linux-extras install nginx1
```

Complete!가 뜨면 성공이다.

 

```
service nginx start
```



![img](https://blog.kakaocdn.net/dn/DdhKo/btq0iWXu3Ug/6wOzVzHED1KmyPXIlsDBT0/img.png)



nginx를 구동시켜주면 완료된다.

 

 



### Nginx 구동 확인



![img](https://blog.kakaocdn.net/dn/cCcZPK/btq0bvN7UD6/1goutRAOGpBuJoZTKGI5Sk/img.png)





Target Group에서 healthy가 뜨면 nginx가 정상적으로 작동한다.

좀 더 정확한 확인을 위해서 ALB의 DNS로 접근하면, nginx의 시작 페이지를 확인할 수 있다.



![img](https://blog.kakaocdn.net/dn/y6QNQ/btq0donpqJp/F3PiekMVBkQqjuTrgdKKlk/img.png)



Linux 내부에서 nginx의 구동을 확인하고싶으면

[medium.com/@taeyeolkim/aws-ec2%EC%97%90-%EC%9B%B9%EC%84%9C%EB%B2%84-nginx-%EC%84%A4%EC%B9%98%ED%95%98%EA%B3%A0-%EA%B5%AC%EB%8F%99%ED%95%98%EA%B8%B0-a46a6e9484a8](https://medium.com/@taeyeolkim/aws-ec2에-웹서버-nginx-설치하고-구동하기-a46a6e9484a8)

[ AWS EC2에 웹서버(Nginx )설치하고 구동하기목표. Yum을 이용한 Nginx 설치 및 구동medium.com](https://medium.com/@taeyeolkim/aws-ec2에-웹서버-nginx-설치하고-구동하기-a46a6e9484a8)

```
ps -ef|grep nginx
netstat -ntlp
```

해당 명령어를 통해서도 가능하다.

 

이후 2번째 Web Server에서 nginx를 설치해주면 완료된다.

 

 



## Linux Nginx - Tomcat 연동



이전 글을 통해 Tomcat 설치까지 완료한 후, Nginx에서 Tomcat 연동을 진행한다.

 

**[Web 서버] Nginx 경로 설정**

```
vi /etc/nginx/nginx.conf
 location / {
                proxy_pass      http://[NLB DNS 경로]:8080;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Hsot $http_host;
        }
```



![img](https://blog.kakaocdn.net/dn/uFztv/btq0fj67FOP/KgZ6fYuft9PhFONt5KNwkK/img.png)



/etc/nginx/nginx.conf 파일에서 server 안에 저 location만 넣어주면 끝난다.

NLB DNS 서버를 넣는데, 앞에 http://와 :8080 포트를 붙여주기만 하면 끝

```
service nginx restart
```

nginx를 restart해주면 된다.

 

**nginx 확인**



![img](https://blog.kakaocdn.net/dn/bc123F/btq0dousPZF/l1bUJkBujbEa2yRsvn6qEK/img.png)



alb의 dns로 가게 되면 이전에 보였던 nginx가 아닌, tomcat 화면이 보이게 된다.