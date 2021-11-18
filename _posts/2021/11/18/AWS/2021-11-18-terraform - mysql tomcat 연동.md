---
layout: post
title: "[AWS] terraform - mysql tomcat 연동"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

이번 파트에서는 Tomcat과 MySQL을 연동한다. 연동이라기보다는 Tomcat에서 MySQL에 접근해서 데이터를 가지고 오는데, JSP 코드를 간단하게 이용할 예정이다.

따라서, 사용할 서버는 Tomcat이 깔려있는 **was1, was2** 서버이다.

 



## MySQL-Connector 설치



먼저, 시작전 간단하게 Java 버전을 확인해주자

```
java -version
javac -version
```



![img](https://blog.kakaocdn.net/dn/bPVgit/btq0n9WKFp3/ktmZRtQ4kalfyeOxj51ab1/img.png)



java 1.8.0_272 버전이다.

 

[dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)

[ MySQL :: Download Connector/JMySQL Connector/J 8.0 is highly recommended for use with MySQL Server 8.0, 5.7 and 5.6. Please upgrade to MySQL Connector/J 8.0.dev.mysql.com](https://dev.mysql.com/downloads/connector/j/)

해당 홈페이지에 들어가서 mysql connector를 다운받는다.

여기서 은근 헤맸었다.

대부분 사이트만 알려주고 wget ~mysqlconnector.tar.gz 파일을 다운받는다고 알려준다.

그런데, 그대로 쳐도 오류가 났었다. connector가 최신 버전 링크가 아니기 때문이다. 따라서, 해당 링크에서 직접 connector.tar.gz 파일 링크를 가져와야 한다.

그런데 tar.gz 파일이 어디있는지는 도저히 못찾았었다.



![img](https://blog.kakaocdn.net/dn/cvfhVv/btq0fkstUUN/OESxMfopmrzbtZ0T4M9su1/img.png)

![img](https://blog.kakaocdn.net/dn/qfuKF/btq0ehv0Mdj/uqFoZjEGUUm4ruk9dm6BA0/img.png)



이렇게, Connector Download 홈페이지에서 Platform Independent을 선택하면, tar.gz 파일을 다운받을 수 있다.

 

```
wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.23.tar.gz
tar xvfz mysql-connector-java-8.0.23.tar.gz
cd mysql-connector-java-8.0.23/
```



![img](https://blog.kakaocdn.net/dn/bvXYZh/btq0iXpK19V/iysKKR4jpsdMKjCR3161F1/img.png)



다운로드 후, 압축을 풀고 폴더로 이동하면 mysql-connector-java-8.0.23.jar 파일을 확인 할 수 있다.

 

```
cp -a mysql-connector-java-8.0.23.jar /usr/lib/jvm/jre/lib/ext/
cp -a mysql-connector-java-8.0.23.jar /root/terra/apache-tomcat-9.0.44/lib/
```

해당 jar파일을 2개의 폴더에 넣어준다.

\1. Java 설치 파일에 넣어준다. 해당 위치는 이전에 한 번 설정해 준 적이 있다.

/etc/profile에서 JAVA_HOME에 설정한 위치에 jre/lib/ext/를 추가적으로 붙여주면 된다.
내 JAVA 파일 위치는 /usr/lib/jvm/ 이었다.

\2. Tomcat의 library에 넣어준다.

톰캣 폴더의 lib에 넣어준다. lib를 확인하면 jar 파일들이 있는 것을 확인할 수 있다.

 



## Tomcat 설정(안해도 되는 것 같다)



안해도 jsp로 접근이 가능한 것 같지만, 혹시 모를 에러를 위해 넣어둔다. 안되면 뭐든 해봐야지...

```
vi /root/terra/apache-tomcat-9.0.44/conf/context.xml
<Context>
   ...
 <Resource name="jdbc/test"
        auth="Container"
        type="javax.sql.DataSource"
        username="root"
        password="Qwert1234!"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://10.0.12.59:3306/test" 
        maxActive="15"
        maxIdle="3"/>
        
   ...
</Context>
```

 

text: DB이름
root: MySQL 계정 이름
password: MySQL 계정 비밀번호
url: "jdbc:mysql://Master DB IP:3306/DB이름"

 

```
vi /root/terra/apache-tomcat-9.0.44/conf/web.xml
 <resource-ref>
                <res-ref-name>jdbc/test<res-ref-name>
                <res-type>javax.sql.DataSource</res-type>
                <res-auth>Container</res-auth>
 </resource-ref>
```

 



## JSP 작성



Tomcat index.jsp를 대신하여 DB에 접근하는 새로운 JSP를 작성한다.

먼저 기존의 index.jsp는 혹시 몰라 파일명만 mv index.jsp index.jspp로 바꿔서 실행이 되지 않도록 했다.

 

```
vi /root/terra/apache-tomcat-9.0.44/webapps/ROOT/index.jsp
```

tomcat이 실행되는 화면의 위치는 webapps/ROOT/index.jsp이다. 새로운 경로를 추가하기보다는 index.jsp를 새롭게 작성하였다.

```
<%@ page import = "java.sql.*" %>
<%

  try{
        Class.forName("com.mysql.jdbc.Driver");
        String url = "jdbc:mysql://10.0.12.59:3306/test";

        Connection conn = DriverManager.getConnection(url, "root", "Qwert1234!");

        out.print("Success!");

  }
  catch(Exception e){
        out.print(e.toString());
  }

%>
```

연결에 성공하면 Success!를 화면에 프린트하는 간단한 코드이다. 연결이 제대로 되지 않으면 error 메세지를 보여준다.

저장 후 ALB의 DNS 서버에 접속하면 성공!

 



### Error

하지만 바로 연결이 될리가 없다.

> Access denied for user 'root'@'ip' (using password: YES)

참고: [amajoy.tistory.com/entry/mysql-Access-denied-for-user-rootip-using-password-YES](https://amajoy.tistory.com/entry/mysql-Access-denied-for-user-rootip-using-password-YES)

연결에 실패하면 화면에 뿌려준 Error 원인이 나타난다. 원인은 MySQL에 내 IP로 접근할 권한이 없어서다.

다시 Master DB 서버로 접속하여 root로 mysql을 접속한다.

```
[Master 서버] mysql> create user root@10.0.11.156 identified by 'Qwert1234!';
[Master 서버] mysql> grant all privileges on *.* to root@10.0.11.156 identified by 'Qwert1234!';
```



ip에는 was의 ip를 추가해주면 된다.

이후 다시 재접속을 하면 Success!를 볼 수 있다.

 

**DB 데이터 출력 JSP**

```
<%@ page import = "java.sql.*" %>
<%

  try{
        Class.forName("com.mysql.jdbc.Driver");
        String url = "jdbc:mysql://10.0.12.59:3306/test";

        Connection conn = DriverManager.getConnection(url, "root", "Qwert1234!");

        out.println("Success!");

        PreparedStatement ps=(PreparedStatement)conn.prepareStatement("SELECT * from test1");

        ResultSet rs=ps.executeQuery();

        while(rs.next()){

                String number=rs.getString("number");

                out.println(number);

        }

  }
  catch(Exception e){
        out.print(e.toString());
  }

%>
```

연결에 성공하면 Success! 출력 후, test1 sql 접근하여 원하는 열을 String으로 가져오는 코드이다.



![img](https://blog.kakaocdn.net/dn/tv6xs/btq0mxqrj9c/8iFjxnbwfF0ORqLuj1wuS1/img.png)데이터가 2개 들어가있다.



 

그리고 이걸 was2에도 똑같이 진행하면 된다. MySQL에 was2의 ip를 넣어주는 것도 필수다.

 

 

드디어 3 tier Architecture 구축 끝!!