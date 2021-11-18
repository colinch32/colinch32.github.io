---
layout: post
title: "[AWS] terraform - apache 와 tomcat"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

**관련글**

[2021.03.11 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Windows Terraform Infra(1)](https://honeywater97.tistory.com/87)

[2021.03.12 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Windows Terraform 서버 (2)](https://honeywater97.tistory.com/88)

사실상 이번 파트는 aws나 terraform보다는 좀 더 범용적이다.

linux (centos)에서 apache 및 tomcat, mysql을 통해 3 tier를 구성하는 것이다.

 



## 환경



\- Xshell7

\- Amazon linux (centOS)

 

 



## Xshell로 Bastion 접속하기





![img](https://blog.kakaocdn.net/dn/bUD2b4/btqZSwmFok1/L2DnnBMng4qWXpKHLsVEzk/img.png)Bastion의 공인 IP를 이용하면 된다.

![img](https://blog.kakaocdn.net/dn/c1nBqT/btqZUW6kE6g/6zop5dYkKnPJHfW11v3T3k/img.png)

![img](https://blog.kakaocdn.net/dn/bNICqD/btqZTUOkOwr/KksOE991MOUYkdhvt3PLk0/img.png)bastion 접속을 위해 등록했던 key를 가져온다. 현재는 test를 위해 모두 같은 key로 통일

![img](https://blog.kakaocdn.net/dn/XWGl8/btqZTVT25yJ/KiOkI03sI1pCvnIOL34Y90/img.png)암호는 비워둔 채로 확인을 클릭한다.

![img](https://blog.kakaocdn.net/dn/k3swo/btqZSuWJ1NV/37mSlYEfykmVr5xnE36y8k/img.png)베스천 접속 완료



 

 



## Bastion에 key.pem 등록 및 private 서버에 접속하기

Bastion에서 private 서버에 접속하기 위해 Xshell에 ip와 port를 이용해 터널링 후, 새 세션으로 접속 할 수 있지만

좀 더 간단하게 접속하기 위해 key 파일을 bastion 내부에 저장하였다.

[byounghee.tistory.com/70](https://byounghee.tistory.com/70)

[ Xshell을 이용하여 Windows에서 Linux로 파일 전송 방법Xshell을 이용하여 Windows에서 Linux로 파일 전송 방법 1. 아래 명령어를 이용하여 lrzsz를 설치한다. $ sudo yum -y install lrzsz [실행결과\] 2. 설치가 완료 되었으면, 리눅스로 옮길 파일 들을 Xshe..byounghee.tistory.com](https://byounghee.tistory.com/70)



해당 작업 이후 key 파일을 bastion에 옮기게 되면 key파일을 bastion에서 확인 할 수 있다.



![img](https://blog.kakaocdn.net/dn/cowrnV/btqZV6HmFsX/lC5wJaoqdaLPB8q2mQdkWK/img.png)



 

이후 private 서버에 접속하기 ssh 명령어로 접속한다.

```
ssh -i test.pem ec2-user@10.0.x.x
```

 

그러나 저 상태에서 바로 접속을 하려 하면



![img](https://blog.kakaocdn.net/dn/bxTRol/btqZZxjUvP4/8yYa4YTqmGOpkw0h2g14vk/img.png)



Permission denied (publickey, gssapi-keyex, gssapi-with-mic). 이러한 경고문구를 볼 수 있다. 권한이 없다.

당황하지 말고 해당 키가 존재하는 위치에서 밑의 명령어를 통해 test.pem에 permisstion을 준다.

```
chmod 400 test.pem
```

 

이후에 다시 ssh 명령어를 통해 접속을 하게 되면 원하는 private 영역에 접근 할 수 있다.

 

 



## Web - Apache 컴파일 설치



[blanche-star.tistory.com/entry/CentOS-7-APM-%EC%84%A4%EC%B9%98-Apache-%EC%84%A4%EC%B9%98%EC%BB%B4%ED%8C%8C%EC%9D%BC%EC%84%A4%EC%B9%98%EC%9E%91%EC%84%B1%EC%A4%91](https://blanche-star.tistory.com/entry/CentOS-7-APM-설치-Apache-설치컴파일설치작성중)

[ CentOS 7 APM 설치 - Apache2.4.38 설치(컴파일설치)순서는 다음과같습니다. openssl 업데이트 → mysql설치 → apache설치 → php설치 사용버전정리 centOS 7 openssl pcre apache apr apr-util mysql php 1810 1.1.1b 8.43 2.4.38 1.6.5 1.6.1 8.0.15 7.3.3 아파치..blanche-star.tistory.com](https://blanche-star.tistory.com/entry/CentOS-7-APM-설치-Apache-설치컴파일설치작성중)

[blog.naver.com/PostView.nhn?blogId=hanajava&logNo=221830527084&categoryNo=0&parentCategoryNo=40&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postList](http://blog.naver.com/PostView.nhn?blogId=hanajava&logNo=221830527084&categoryNo=0&parentCategoryNo=40&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postList)

[ [hana\] CentOS 7 Apache 2.4.x 컴파일 설치[서버 환경]OS : CentOS 7.5 64bit CPU : Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz...blog.naver.com](http://blog.naver.com/PostView.nhn?blogId=hanajava&logNo=221830527084&categoryNo=0&parentCategoryNo=40&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postList)

Apache를 설치하는 2가지 방법이 있다.

\1. yum 설치

\2. 컴파일 설치

yum 설치가 좀 더 간단하지만, 컴파일로 apache 설치를 진행한다.



### 사전 진행

먼저, **sudo -i**로 root 계정으로 접속하도록 한다. root가 아니면 실행되지 않는 명령어가 많다.

이후 yum update 및 패키지 설정으로 apache 컴파일 다운로드를 위한 세팅을 진행한다.

```
yum -y update
yum -y install gcc-c++
yum -y install zlib-devel
yum -y install openssl-devel
yum -y install expat-devel
yum groupinstall 'Development Tools'
```

 

 

**apache 파일 다운로드**

컴파일 설치는 apache 사이트에서 직접 zip 파일을 가져오는 것이다.

이후, 해당 링크에서 Source에 있는 tar.gz 파일의 링크를 복사해 wget 명령어로 다운로드를 진행한다.

https://httpd.apache.org/download.cgi

[ Download - The Apache HTTP Server ProjectDownloading the Apache HTTP Server Use the links below to download the Apache HTTP Server from one of our mirrors. You must verify the integrity of the downloaded files using signatures downloaded from our main distribution directory. The signatures can behttpd.apache.org](https://httpd.apache.org/download.cgi)



![img](https://blog.kakaocdn.net/dn/ZmUgw/btqZWOfuauI/ku1kuCpKTbTXQT24QhCXQk/img.png)



```
wget https://downloads.apache.org//httpd/httpd-2.4.46.tar.gz
```

ls로 파일 확인 후 gzip으로 압축파일을 풀어준다.

```
tar xvf httpd-2.4.46
```

\- 위 tar.bz2로 wget된 파일은 z옵션을 제거해야 한다. tar xvfz를 하게되면 gzip: stdin: not in gzip format 에러가 발생한다.

 

\2. apr & apr-util 다운로드

[apr.apache.org/download.cgi](https://apr.apache.org/download.cgi)

[ Download - The Apache Portable Runtime ProjectThe currently selected mirror is https://downloads.apache.org/. If you encounter a problem with this mirror, please select another mirror. If all mirrors are failing, there are backup mirrors (at the end of the mirrors list) that should be available. You mapr.apache.org](https://apr.apache.org/download.cgi)



![img](https://blog.kakaocdn.net/dn/OfkWV/btqZTUA01Oh/w76TPBzO1llM3vR0emGZIk/img.png)이왕이면 tar.gz를 다운받자



```
wget https://downloads.apache.org//apr/apr-1.7.0.tar.gz
wget https://apr.apache.org/download.cgi
```

위가 apr, 밑이 apr-util이다.

이후 마찬가지로 압축 풀기 진행

```
tar xvfz apr~
```



![img](https://blog.kakaocdn.net/dn/b3AljK/btqZUVNglet/Rsm7suzsWS5fpe95WGz4S1/img.png)압축 풀기 완료



 

**pcre 다운로드 및 설치**

Perl Compatible Regular Expressions, 정규 표현식을 지원하는 라이브러리

```
wget https://sourceforge.net/projects/pcre/files/pcre/8.43/pcre-8.43.tar.gz/download -O pcre-8.43.tar.gz
```

tar로 압축해제를 진행한 후 설치를 진행한다.

```
cd pcre-8.43
./configure
make
make install
```

 

 

**apr과 apr-util을 httpd 폴더 안으로 이동하기**

```
mv apr-1.7.0 httpd-2.4.46/srclib/apr
mv apr-util-1.6.1 httpd-2.4.46/srclib/apr-util
```

**apache 설치**

```
cd httpd-2.4.46

./configure --prefix=/usr/local/apache --enable-so --enable-ssl=shared --with-ssl=/usr/local/ssl --enable-rewrite

make

make install
```

/usr/local/apache가 저장 폴더가 된다.

**서비스 등록 (파일수정) - 이건 안해도 되는 듯 싶다.**

```
vi /usr/lib/systemd/system/httpd.service
```



[Unit]

Description=The Apache HTTP Server

 

[Service]

Type=forking

PIDFile=/usr/local/apache/logs/httpd.pid

ExecStart=/usr/local/apache/bin/apachectl start

ExecReload=/usr/local/apache/bin/apachectl graceful

ExecStop=/usr/local/apache/bin/apachectl stop

KillSignal=SIGCONT

PrivateTmp=true

 

[Install]

WantedBy=multi-user.target

 

**Apache 실행**

```
systemctl httpd start
```



그런데 여기서 에러가 걸렸다.

*Unknown operation 'httpd'*

\> 해당 에러를 잡기위해 많은 것을 해봤지만 못찾았었는데, pcre를 다운받고 다시 차근차근 시작했다.

 

apache 실행에는 여러 명령어가 있는데, systemctl이 잘 되지 않으면

 

```
/usr/local/apache2/bin/httpd -k start
```

설치한 루트로 가서 직접 실행

 

```
service httpd start
```

service 명령어로 실행하는 방법이 있다.

 

**Apache 실행 확인**



![img](https://blog.kakaocdn.net/dn/CaY1s/btqZ2bajlK8/JgoZln56ZZCCQ7dkvRgqyk/img.png)아직 설정을 하나만 했다.



apache가 정상적으로 실행이 됐다면, 조금 기다린 후에 타겟 그룹을 확인하면 healthy로 바뀌어 있는 것을 볼 수 있다.

ALB는 도메인을 가지고 있기 때문에, ALB의 도메인으로 접속하면 healthy로 되어 있는 서버에 로드밸런스를 해준다.



![img](https://blog.kakaocdn.net/dn/bd0cJt/btq0c2Ye9Fk/m5ZFeOh7w49zNxP5keziDk/img.png)



위와 같은 문구가 ALB의 링크에 나타나게 된다.

그리고 위와 같은 방법을 2에도 실행해주면된다.

또다시 설치를 진행하고 싶지 않다면 ami를 떠서 ec2를 새로 생성해주면 된다.

 

 



## Was - EBS에 Tomcat 컴파일 설치



Tomcat을 원하는 위치에 설치하기 위해 컴파일로 설치를 진행한다.

Tomcat을 root가 아닌 새로운 EBS에 설치한다.

 



### 사전 진행



일단 yum -y update를 통해 yum을 update를 해준다.

먼저, EC2에서 추가한 EBS를 사용하기위해 등록을 진행한다.

```
lsblk
```

![img](https://blog.kakaocdn.net/dn/8faOJ/btqZ4AtTruk/eKkQWlXsC0IFQdrc9qs7hk/img.png)

lsblk 명령어를 통해 현재 ec2에 연결된 disk를 확인할 수 있다. xvda는 root disk이다.

우리가 사용할 disk는 xvdb인데, 아직 등록이 안되어 있다.

 

**Mount 진행**

[docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ebs-using-volumes.html](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ebs-using-volumes.html)

[ Amazon EBS 볼륨을 Linux에서 사용할 수 있도록 만들기 - Amazon Elastic Compute Cloud(볼륨을 다른 인스턴스로 옮긴 후 등의 상황에서) 이 볼륨을 연결하지 않고 인스턴스를 부팅했다면, nofail 탑재 옵션을 이용해 볼륨 탑재 시 오류가 있더라도 인스턴스를 부팅할 수 있습니다. 16.0docs.aws.amazon.com](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ebs-using-volumes.html)

**- 에러 (mount 전 실행)**

> mount: /test: wrong fs type, bad option, bad superblock on /dev/xvdb, missing codepage or helper program, or other error.

타입에 대한 확인이 필요하다.

[unix.stackexchange.com/questions/315063/mount-wrong-fs-type-bad-option-bad-superblock](https://unix.stackexchange.com/questions/315063/mount-wrong-fs-type-bad-option-bad-superblock)

```
mkfs.ext4 /dev/xvdb
```

등록을 해주면 등록 완료된다.

 

현재 위치 root(~)에서 진행한다. 따라서 terra 폴더는 /root/terra에 만든다. 

```
mkdir terra
mount /dev/xvdb	/root/terra
```

mount할 폴더를 생성하고, mount 명령어를 통해 disk와 폴더를 mount한다.

재부팅 후에도 마운트를 유지하기위해 fstab에 해당 경로를 등록해줘야 한다.

```
blkid
```

해당 명령어로 disk의 UUID를 알아낸다.

```
vim /etc/fstab
```

vi 또는 vim 편집기로 /etc/fstab에 UUID와 파일 경로를 등록하면은 완료된다.

![img](https://blog.kakaocdn.net/dn/cjRYDQ/btqZ3gi4Gpr/oaEPRkKwXlgS0uZMB59Xjk/img.png)

unmount 후 다시 mount를 진행하면 완료된다.

```
mount -a
```

혹시 모르니 mount -a를 통해 다시 등록해준다.

이후 작업 위치를 cd로 움직여 /root/terra에서 Tomcat 컴파일을 진행한다.

 

**Tomcat**

**java8 설치**

Tomcat은 Java가 필요하다.

```
yum install -y java-1.8.0-openjdk-devel.x86_64

# java 버전 확인
javac -version
```

java8 버전으로 자바를 설치한다.

 

**Tomcat 컴파일 설치**

[downloads.apache.org/tomcat/tomcat-9/v9.0.44/bin/](https://downloads.apache.org/tomcat/tomcat-9/v9.0.44/bin/)

[ Index of /tomcat/tomcat-9/v9.0.44/bin downloads.apache.org](https://downloads.apache.org/tomcat/tomcat-9/v9.0.44/bin/)

```
wget https://downloads.apache.org/tomcat/tomcat-9/v9.0.44/bin/apache-tomcat-9.0.44.tar.gz
tar xzf apache-tomcat-9.0.44.tar.gz
chown -R ec2-user:ec2-user apache-tomcat-9.0.44
```

해당 사이트에서 wget을 통해 tomcat 폴더를 받아온 후, 압축 해제 및 소유자 변경을 진행한다.



![img](https://blog.kakaocdn.net/dn/cpu6jP/btqZ1aDthoX/SCgWwCQB3TmGeSlzeOw5q1/img.png)



그러면 terra 폴더에 이와 같이 apache 폴더가 생기게 된다.

 

**PATH 경로 지정**

```
vim /etc/profile
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.272.b10-1.amzn2.0.1.x86_64
CATALINA_HOME=/root/terra/apache-tomcat-9.0.44
CLASSPATH=$JAVA_HOME/jre/lib:$JAVA_HOME/lib/tools.jar:$CATALINA_HOME/lib-jsp-api.jar:$CATALINA_HOME/lib/servlet-api.jar
PATH=$PATH:$JAVA_HOME/bin:/bin:/sbin
export JAVA_HOME PATH CLASSPATH CATALINA_HOME
```

/etc/profile의 제일 마지막에 해당 경로를 추가한다.

JAVA_HOME은 /usr/lib/jvm에 있는 java 버전으로 바꿔준다.

CATALINA_HOME은 tomcat 파일이 존재하는 위치이다.

tomcat은 servlet으로 구동되기 때문에 java와 tomcat 파일을 이용해 구동을 할 수 있다. tomcat의 위치에 있는 servlet을 사용한다.

 

```
source /etc/profile
```

설정을 적용한다.

 

**방화벽**

[xorms0707.tistory.com/93](https://xorms0707.tistory.com/93)

```
# 방화벽 명령어 설치
yum install firewalld

# 시스템 등록
systemctl unmask firewalld
systemctl enable firewalld
systemctl start firwalld

# 방화벽 설정
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# 8080 port open
firewall-cmd --zone=public --permanent --add-port=8080/tcp
```

안되는 이유를 찾아서 이것저것 설정했었는데, 안되면 일단 방화벽이라도 오픈해보자

 

**Tomcat 실행**

```
cd apache-tomcat-9.0.44/bin
./startup.sh
```

해당 폴더로 움직여서 startup shell을 실행시키면 tomcat을 실행할 수 있다.

 

 

**Tomcat 실행 확인**

```
ps -ef | grep tomcat
netstat -tnl
curl http://localhost:8080
```

여러 명령어로 확인할 수 있는 데, curl 명령어를 통해 index.html이 잘 받아오면 성공이다.

port가 열린 것을 확인하고 싶으면 netstat -tnl로 8080이 열려있는 지 확인한다.

이후 apache와 마찬가지로 로드밸런서에서 타겟 그룹이 healthy가 되어있는 지 확인한다.

 

이후 apache, tomcat 연동 및 DB 연동은 (4)에서 이어진다.

근데 apache가 잘 안되는데,,이유가 뭘까?

 