---
layout: post
title: "[AWS] AWS의 자산을 Python으로 관리하기"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

AWS의 자산을 Python으로 관리하기

> 📌 환경
>
> - Windows 10
> - Visual Studio Code
> - AWS, AWS CLI



### 1. Python 및 Boto3 설치

#### Python 설치

> https://www.python.org/

1. 위의 python 홈페이지에서 Downloads 👉 Python 3.x.x (최신 버전)으로 다운로드 진행

	> 필요한 라이브러리가 최신 버전을 지원하지 않는 경우
	>
	> - View the full list of donwloads를 통해 낮은 버전으로 다운로드 진행

![image-20210118162653629](..\image\image-20210118162653629.png)



2. exe 파일 실행 👉 Install Now

	> ❗ Add Python 3.9 to PATH를 반드시 체크해준다. 환경변수의 PATH 설정을 자동으로 해줌

![image-20210118162825027](..\image\image-20210118162825027.png)



#### Boto3 다운로드

1. Windows 키 👉 CMD

2. CMD 창에서 ***python -m pip install Boto3*** 입력 > 설치

	```
	python -m pip install Boto3
	```

![image-20210118162301023](..\image\image-20210118162301023.png)

3. AWS CLI도 같이 설치해주자

	```
	pip install awscli
	```





🚀 설치됐는지 확인

```
pip list
```

![image-20210118171809372](..\image\image-20210118171809372.png)

설치 확인 완료



### 2. AWS CLI 설정

1. AWS Console 로그인

2. 로그인 이름(오른쪽 상단에서 지역 선택 옆에 설정한 이름 클릭) > 내 보안 자격 증명 > 새 엑세스키 만들기

   ![image-20210118173124267](..\image\image-20210118173124267.png)

   > 액세스 키는 매우 중요하다. 오픈된 공간에 올리게 되면 해킹의 위험이 있다. 그것도 모르고 github에 실수로 키와 비번을 업로드 하는 바람에 50만원이 청구되었다. 그러니 매우 조심!

   

3. AWS CLI에 해당 키 등록

   ```
   aws configure				//cmd창에 바로 치면 된다.
   ```

![image-20210118172332714](..\image\image-20210118172332714.png)

- 기본 설정

  | AWS Access Key ID | AWS Secret Acess Key | Default region name        | Default output foramt |
  | ----------------- | -------------------- | -------------------------- | --------------------- |
  | 액세스 키 ID 입력 | 액세스 키 PW 입력    | 기본 지역 설정             | 기본 포맷 설정        |
  |                   |                      | ap-northeadst-2: 서울 리전 |                       |

  

### 3. Boto3 with Python

> 공식 사이트 https://boto3.amazonaws.com/v1/documentation/api/latest/index.html

공식 사이트를 참고하면 사용법이 나와있다.

#### boto3.resource와 boto3.client 차이

> 한글 blog https://planbs.tistory.com/entry/boto3resource%EC%99%80-boto3client%EC%9D%98-%EC%B0%A8%EC%9D%B4
>
> stackoverflow https://stackoverflow.com/questions/42809096/difference-in-boto3-between-resource-client-and-session

##### Client

```python
import boto3

BUCKET_NAME = 'board-s3'									#가지고 올 bucket 이름
client = boto3.client('s3')									#s3를 가지고 옴
response = client.list_objects(Bucket=BUCKET_NAME)			#BUCKET_NAME과 이름이 같은 bucket object를 가져옴

for content in response['Contents']:						#response의 contents 불러오기
    obj_dic = client.get_object(Bucket = BUCKET_NAME, Key = content['Key'])
    print(content['Key'], obj_dict['LastModified'])
```

- AWS 서비스 API와 1:1 매핑

- low level 인터페이스

- botocore 수준의 client 공개

  > botocore: AWS CLI와 boto3의 기초가 되는 라이브러리

##### Resource

```python
import boto3

BUCKET_NAME = 'board-s3'
s3 = boto3.resource('s3')									#s3를 가지고 옴
bucket = s3.Bucket(BUCKET_NAME)								#BUCKET_NAME의 bucket 정보 가지고 옴

for obj in bucket.objects.all():							
    print(obj.key, obj.last_modified)
```

- 객체지향적 인터페이스

- 식별자와 속성 사용

- 자원 조작 위주

  > 자원에 대해 직관적인 구문

##### 결론

- Client에서 사용되는 함수 중 Resource에서는 매핑이 안되어 있는 것도 있다.
- Resource가 자원 조작하기에 더 직관적이다.



#### 내가 가진 S3 Name 불러오기

> test.py

```python
import boto3

# 자격 증명 별도 명시시 사용
	# ACCESS_KEY = "..."
	# SECRET_KEY = "..."
	# SESSION_TOKEN = "..."

s3 = boto3.resource('s3') 			#s3 resource 불러오기
for bucket in s3.buckets.all():
    print(bucket.name)
```

해당 파일이 존재하는 cmd 창에서 **test.py**를 입력하면 내가 가진 S3 버킷의 Name 결과가 출력된다.



---

## 각 기능별 코드

- 공통

  ``` python
  import boto3									#AWS와 연결
  
  # excel로 저장
  from openpyxl import load_workbook
  from openpyxl import Workbook
  from openpyxl.styles import PatternFill, Border, Side, Alignment, Protection, Font, Color
  
  
  ec2 = boto3.resource('ec2')
  client = boto3.client('ec2')
  ```

  ⚠ 변수 저장이나 print 구문 생략



#### VPC

- vpc

	```python
	vpcs = ec2.vpcs.all()
  for vpc in vpcs:
    	vpc_id = vpc.id								# vpc id
    	if vpc.tags:
        	for tags in vpc.tags:					# vpc tags
            	if tags["Key"] == 'Name':			# tag 이름이 Name 이면
                	tags["Value"]					# tag의 값을 가져옴
                
	  	cidr_block = vpc.cidr_block					# vpc의 cidr block 값
	```



- subnet

	```python
	subnets = ec2.subnets.all()
	
	# 대부분의 명령어가 vpc와 비슷
	subnet_az = subnet.availability_zone			# subnet의 az 가져오기
	```



- internet gateway

  ```python
  igws = ec2.internet_gateways.all()
  
# 대부분의 명령어가 vpc와 비슷
  # for 문을 통해 igws 안으로 들어간 후 igw의 attachments 가져오기
for attachments in igw.attachements:
      if attachements["State"] == 'available':
        igw_vpc_id = attachments["VpcId"]
  ```
  



- Natgateway

  ```python
  ngws = client.describe_nat_gateway()['NatGateways']
  
  if ngws:									# ngw가 있을 때 접근
      for ngw in ngws:
          nat_address = ngw['NatGatewayAddresses']		# nat gateway의 address에 접근
          for nata in nat_address:
              nat_ip = nata['PublicIp']					# nat gateway의 public ip
          
          ngw['NatGatewayId']								# nat gateway의 id
          ngw['VpcId']									# nat gateway의 vpc id
          ngw['SubnetId']									# nat gateway의 subnet id
  ```



- Routing Table

  ```python
  rtbs = client.describe_route_tables()['RouteTables']
  
  for rtb in rtbs:
      rtb_id = rtb['RouteTableId']
      if rtb.get('Associations'):
          for rtba in rtb['Associations']:
              if rtba.get('SubnetId'):
                  rtba['SubnetId']
                  
      rtb['VpcId']												# routing table의 vpc id
      rtb['Routes']												# routing table의 routes
      
      for routes in rtb['Routes']:
          if routes.get('GatewayId')								# .get으로 원하는 내용이 있는 지 찾고
          	rtb_target = routes['GatewayId']					# [name]으로 저장
              if routes.get('DestinationPrefixListId')
              	rtb_dest = routes['DestinationPrefixListId']
          elif routes.get('NatGatewayId')							# routing table이 향하는 id가 어디인지 찾아준다.
  ```

  > 궁금한 점은 Routing Table이냐, Route Table이 맞는가 이다. 한국에서는 주로 라우팅 테이블이라고 읽는데, 영어네이밍으로는 Route Table도 많이 본 것 같다. 위키백과를 보니 **Routing Table**이 맞는듯!



#### EC2 Instance

```python
for instance in ec2.instances.all():			# 모든 인스턴스
    instance_id = instance.id
```



- instance 태그 식별

	```python
  for tags in instance.tags:					# 인스턴스의 태그
      if tags["Key"] == 'Name':				# 이름이 Name인 것 찾기
          instance_name = tags["Value"]		# 해당하는 태그의 값을 저장
	```



- Security Group

  ```python
  for sgs in instance.security_groups:
      sgs['GroupName']						# security groups의 이름
    sgs['GroupId']							# security gorups의 ID
  ```

  

- 속성

  ```python
  # 속성 가져오기
  attributes = client.describe_instance_attribute(
  	InstanceId = instance.id
      Attribute = 'blockDeviceMapping'				# 블록 디바이스 매핑
  )
  ```

  ```python
  # 블록 디바이스 속성
  for attribute in attributes["BlockDeviceMappings"]:
      attribute['DeviceName']
      attribute['Ebs']['VolumeId']						# Ebs의 Volum ID 속성
      volumes = client.describe_volumes(
      	VolumesIds = [volid]							# Volume Id 저장
      )
      for vols in volumes['Volumes']:
          vols['Size']									# 볼륨 size
  ```

  

- 그 외 변수 참고

  ```python
  instance.image_id										# 이미지
  instance_type = instance.instance_type					# 인스턴스 타입
  state = instance.state["Name"]							# 상태 이름
  vpc_id = instance.vpc_id								# 인스턴스의 vpc id
  subnet_id = instance.subnet_id							# 서브넷의 id
  private_ipt = instance.private_ip_address				# private ip 주소
  
  instance.network_interfaces								# 인스턴스의 네트워크 인터페이스
  	iface.mac_address									# ⬆의 맥 주소
  
  instance.root_device_name								# root device의 이름
  ```





🕹 대부분 비슷하게 변수명을 가지고 간다. 비슷하게 접근하면 원하는 리소스의 정보를 얻을 수 있다. 더욱 자세한건 공식 문서에 나와있겠지만 일단은 이정도로 필요한 정보를 얻어 올 수 있다.