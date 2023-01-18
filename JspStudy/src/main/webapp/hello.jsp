<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Jsp 첫번째예제</title>
</head>
<body>
	<%
  //Scriptlet(스크립트릿=>자바코드를 사용할 수 있도록 만들어주는 영역)
     String str="테스트"; 
	//document.write("str=>"+str);
	System.out.println("str="+str); 
	out.println("set="+str);
  %>
 <hr>
 str의 값출력=<%=str %>
>>>>>>> refs/heads/hotfix
</body>
</html>