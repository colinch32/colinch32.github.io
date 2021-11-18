---
layout: post
title: "[AWS] terraform - 네트워크"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---


**관련글**

[2021.03.11 - [IT/AWS\] - [3T] AWS 3 tier Architecture 구성하기 - Windows Terraform Infra(1)](https://honeywater97.tistory.com/87)

해당 파트에서는 2개의 Load balancer(ALB, NLB)와 Security Group, EC2를 생성한다.

순서는 Bastion -> web -> was -> db 순서대로 관련 resource를 생성한다.

네이밍룰은 이전과 동일하다.

 



## Terraform Bastion - Security Group & EC2



security group은 EC2 생성 전에 만들어주는 것이 좋다.

그러나 EC2 생성 후에도 sg를 추가할 수 있다.

sg는 적용할 인스턴스 별로 파일을 나누는 게 좀 더 보기 좋다. in/out bound가 많아지면 너무 길어서 보기 힘들기 때문

 

**Security Group**

```
resource "aws_security_group" "terra-sg-pub-bastion"{
    name    = "terra-sg-pub-bastion"
    description = "terra-sg-pub-bastion"
    vpc_id  = aws_vpc.terra-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]    
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
      Name = "terra-sg-pub-bastion"
  }
}
```

\- Bastion에 사용할 sg이다.

\- ingress는 Bastion에 접속 가능한 port를 의미한다.
외부에서 public에 접근하므로 any open으로 열고, xshell을 이용한 ssh 접속이므로 22번 port를 열었다.

\- egress는 Bastion에서 접속 할 그룹을 설정했다.
나가는 경우에는 큰 제한을 두지 않았다.

 

**EC2**

```
resource "aws_instance" "terra-ec2-pub-a-bastion"{
  ami = "ami-006e2f9fa7597680a"
  instance_type = "t2.micro"
  availability_zone = "ap-northeast-2a"

  subnet_id = aws_subnet.terra-sub-pub-a.id
  key_name = "test"
  vpc_security_group_ids = [
      aws_security_group.terra-sg-pub-bastion.id
  ]
  tags = {
      Name = "terra-ec2-pub-a-bastion"
  }
}
```


\* ami: 인스턴스의 os 선택
\* instance_type: 생성할 cpu, memory를 고려한 type 설정
\* availability_zone: az 설정
\* key_name: instance에 접근하기 위해 필요한 key 설정
\* vpc_security_group_ids: ec2의 sg 설정

 

terraform plan > terraform apply



![img](https://blog.kakaocdn.net/dn/OrNHP/btqZQImkYVz/JGVq6LjncUYpmmWYu0xXXK/img.png)

![img](https://blog.kakaocdn.net/dn/bkHSdG/btqZVlpW31v/GxXYocskGjYJ7cdm7bHKf0/img.png)



상세 설정을 보면 이와 같이 테라폼으로 설정한 ec2의 내용을 확인 할 수 있다.

Bastion은 Public 영역에서 Private 영역 접근에 필요할 때, 터널링 역할을 해주는 서버이다.

 



## Terraform Web Was DB - Security Group & EC2



private 영역에서 a와 c존에 각각 두 대씩 instance를 만들어준다.

(Security Group은 이후에 수정)

 

**EC2**

```
# web, db 이중화 구성
# a 대역에 ec2 생성
resource "aws_instance" "terra-ec2-pri-a-web1"{
  ami = "ami-006e2f9fa7597680a"
  instance_type = "t2.micro"
  availability_zone = "ap-northeast-2a"

  subnet_id = aws_subnet.terra-sub-pri-a-web.id
  key_name = "test"
  vpc_security_group_ids = [
      aws_security_group.terra-sg-pri-web.id
  ]
  tags = {
      Name = "terra-ec2-pri-a-web1"
  }
}

# c 대역에 ec2 생성
resource "aws_instance" "terra-ec2-pri-c-web2"{
  ami = "ami-006e2f9fa7597680a"
  instance_type = "t2.micro"
  availability_zone = "ap-northeast-2c"

  subnet_id = aws_subnet.terra-sub-pri-c-web.id
  key_name = "test"
  vpc_security_group_ids = [
      aws_security_group.terra-sg-pri-web.id
  ]
  tags = {
      Name = "terra-ec2-pri-c-web2"
  }
}

# was 역시 2중화 구성이지만 ebs를 추가적으로 붙여준다.

# was
resource "aws_instance" "terra-ec2-pri-a-was1"{
  ami = "ami-006e2f9fa7597680a"
  instance_type = "t2.micro"
  availability_zone = "ap-northeast-2a"

  subnet_id = aws_subnet.terra-sub-pri-a-was.id
  key_name = "test"


# ebs 추가적으로 구성
  ebs_block_device{
    device_name ="/dev/sdb"
    volume_size  = "8"
  }


  vpc_security_group_ids = [
      aws_security_group.terra-sg-pri-was.id
  ]
  tags = {
      Name = "terra-ec2-pri-a-was1"
  }
}


resource "aws_instance" "terra-ec2-pri-c-was2"{
  ami = "ami-006e2f9fa7597680a"
  instance_type = "t2.micro"
  availability_zone = "ap-northeast-2c"

  subnet_id = aws_subnet.terra-sub-pri-c-was.id
  key_name = "test"


  ebs_block_device{
    device_name ="/dev/sdb"
    volume_size  = "8"
  }

  vpc_security_group_ids = [
      aws_security_group.terra-sg-pri-was.id
  ]
  tags = {
      Name = "terra-ec2-pri-c-was2"
  }
}
```

\- web과 db의 경우에는 기존 bastion과 크게 다르지 않게 구성

\- 여기서 추가적으로 필요한 옵션들을 넣어주면 된다.

\- was는 tomcat 설치를 ebs에서 compile로 진행하기위해 ebs block을 추가적으로 붙여줬다.

 



## Terraform Web ALB, Was NLB



web, was 이중화를 위해 LB가 필요하다.

 

**alb란? Application Load Balancer**

> HTTP 및 HTTPS 트래픽 로드밸런싱 최적화 된 L7 로드밸런서

\- web: 주소를 통해서 들어오므로 프론트단에 접속하기 때문에 http를 로드밸런싱하는 alb를 달아준다.

```
# alb 생성
resource "aws_lb" "terra-alb-web"{
    name    = "terra-alb-web"
    internal    = false			# 외부
    load_balancer_type = "application"
    security_groups = [aws_security_group.terra-sg-alb-web.id]	# alb는 sg 필요
    subnets     = [aws_subnet.terra-sub-pub-a.id, aws_subnet.terra-sub-pub-c.id]	# public subnet에서 web 통신
    tags = {
        Name = "terra-alb-web"
    }
}

# 타겟그룹 생성
resource "aws_lb_target_group" "terra-atg-web"{
    name    = "terra-atg-web"
    port    = "80"
    protocol   = "HTTP"
    vpc_id  = aws_vpc.terra-vpc.id
    target_type = "instance"
    tags = {
        Name = "terra-atg-web"
    }
}

# 리스너 생성
resource "aws_lb_listener" "terra-alt-web"{
    load_balancer_arn = aws_lb.terra-alb-web.arn
    port    = "80"
    protocol    = "HTTP"
    default_action{
        type = "forward"
        target_group_arn = aws_lb_target_group.terra-atg-web.arn
    }
}

# 2개의 web attachement
resource "aws_lb_target_group_attachment" "terra-att-web1"{
    target_group_arn    = aws_lb_target_group.terra-atg-web.arn
    target_id   = aws_instance.terra-ec2-pri-a-web1.id
    port    = 80
}
resource "aws_lb_target_group_attachment" "terra-att-web2"{
    target_group_arn    = aws_lb_target_group.terra-atg-web.arn
    target_id   = aws_instance.terra-ec2-pri-c-web2.id
    port    = 80
}
# alb sg
resource "aws_security_group" "terra-sg-alb-web" {
  name        = "terra-sg-alb-web"
  description = "terra-sg-alb-web"
  vpc_id      = aws_vpc.terra-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]    
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
   Name = "terra-sg-alb-web"
  }
}
```

\- alb는 sg가 필요하다. 또한, 외부에서 접근이 가능하므로 internal은 false가 된다.

 

**nlb란? Network Load Balancer**

> TCP, UDP 등 서버 구축 시 최적의 성능을 보여주는 L4 로드밸런서

\- was: ip port로 web에서 was로 접근하므로 tcp 통신을 로드밸런싱하는 nlb를 달아준다.

```
# nlb 생성
resource "aws_lb" "terra-nlb-was"{
    name    = "terra-nlb-was"
    internal    = true			# 내부 접근
    load_balancer_type = "network"
    subnets     = [aws_subnet.terra-sub-pri-a-web.id, aws_subnet.terra-sub-pri-c-web.id]	# web subnet에서 was를 바라봄
    tags = {
        Name = "terra-nlb-was"
    }
}

# 타겟그룹
# was에서 진행 될 tomcat의 경우, 8080 port로 통신된다.
resource "aws_lb_target_group" "terra-ntg-was"{
    name    = "terra-ntg-was"
    port    = "8080"
    protocol  = "TCP"
    vpc_id  = aws_vpc.terra-vpc.id
    target_type = "instance"
    tags = {
        Name = "terra-ntg-was"
    }
}

resource "aws_lb_listener" "terra-nlt-was"{
    load_balancer_arn = aws_lb.terra-nlb-was.arn
    port    = "8080"
    protocol    = "TCP"
    default_action{
        type = "forward"
        target_group_arn = aws_lb_target_group.terra-ntg-was.arn
    }
}

resource "aws_lb_target_group_attachment" "terra-ntt-was1"{
    target_group_arn    = aws_lb_target_group.terra-ntg-was.arn
    target_id   = aws_instance.terra-ec2-pri-a-was1.id
    port    = 8080
}
resource "aws_lb_target_group_attachment" "terra-ntt-was2"{
    target_group_arn    = aws_lb_target_group.terra-ntg-was.arn
    target_id   = aws_instance.terra-ec2-pri-c-was2.id
    port    = 8080
}
```

 

lb가 놓일 subnet의 위치는 크게 상관이 없지만, 타겟그룹은 중요하다.

 

terraform plan > terraform apply를 진행하면 서비스가 생성된다.



![img](https://blog.kakaocdn.net/dn/bwGl2J/btqZ0taatlX/9VguCbQ8CWOHVWYOuOxxwk/img.png)



ec2에서 대상 그룹을 선택하게 되면 lb 대상 그룹을 생성한 것을 확인 할 수 있다.

확인하고 싶은 target group을 선택한 후, Targets를 누르면 현재 instance의 상태를 확인할 수 있다.



![img](https://blog.kakaocdn.net/dn/cNAjEv/btqZZTUt4WJ/lj1KC7IZr2b81TEy4qcBM0/img.png)



이렇게 unhealthy가 뜨게 되는데, 이유는 사용할 port를 지정해 주었지만 현재 아무런 것도 깔려 있지 않기 때문에 unhealthy 상태를 출력한다.

[2021.02.05 - [IT/실수하지말자\] - Network Load Balancer Unhealthy](https://honeywater97.tistory.com/43)

[ Network Load Balancer Unhealthy아마존 공식 홈페이지에 잘 나와 있다. https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-troubleshooting.html 하지만 번역 투는 쉽게 읽히지 않는다. Healthy Check 로드 밸런서..honeywater97.tistory.com](https://honeywater97.tistory.com/43)

해당 페이지에서 좀 더 자세하게 unhealthy의 이유를 확인할 수 있다.

 

 

이렇게 모든 aws 서비스 생성을 테라폼을 통해 올렸다.

이후 3 tier 내부 구성은 (3)에서 이어진다.

