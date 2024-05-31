<html>
    <head>
        <title>註冊會員頁面</title>
    </head>
    <body>
        <h2>註冊會員</h2>
        <form action="register.php" method="post">
            <lable>使用者名稱:</lable>
            <input type="text" name="name" required placeholder="輸入名稱"><br>

            <label>郵件地址：</label>
            <input type="email" name="mail" required placeholder="輸入email"><br>

            <label>帳號：</label>
            <input type="text" name="account" required placeholder="輸入帳號"><br>

            <label>密碼：</label>
            <input type="password" name="password" required placeholder="輸入密碼"><br>
            
            <label>確認密碼：</label>
            <input type="password" name="confirm_pas" required><br>
            <input type="submit" value="提交">
        </form>
    </body>
</html>