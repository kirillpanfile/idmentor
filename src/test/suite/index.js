let data = `
<!DOCTYPE html>
<html>
<head>
<style>
#myHeader {
  background-color: lightblue;
  color: black;
  padding: 40px;
  text-align: center;
}
</style>
</head>
<body>

<h1 id="myHeader">My Header</h1>
<h1 id="myHeade123r">My Header</h1>

</body>
</html>
`;
let result = data.match(/id="[A-za-z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+"/g).join('').match(/\".*?\"/g).join(' ').split(' ');
result = result.map(el => `let ${el.replace('"', '').slice(0, el.length - 2)} = document.getElementById("${el}");`);
console.log(result);
