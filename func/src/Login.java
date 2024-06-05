import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class Login extends JFrame {
    private JTextField usernameField;
    private JPasswordField passwordField;

    public Login() {
        // 設置登入介面框架
        setTitle("Login");
        setSize(300, 150);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new GridLayout(3, 2));

        // 添加使用者名標籤和輸入框
        add(new JLabel("Username:"));
        usernameField = new JTextField();
        add(usernameField);

        // 添加密碼標籤和輸入框
        add(new JLabel("Password:"));
        passwordField = new JPasswordField();
        add(passwordField);

        // 添加登入按鈕及其點擊事件處理
        JButton loginButton = new JButton("Login");
        loginButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                login();
            }
        });
        add(loginButton);

        // 設置框架可見
        setVisible(true);
    }

    private void login() {
        // 資料庫連接信息
        String url = "jdbc:mysql://localhost:3306/member";
        String username = "root";
        String password = "1234567890";

        // 獲取使用者輸入的資料
        String loginUsername = usernameField.getText();
        String loginPassword = new String(passwordField.getPassword());

        // SQL 查詢語句
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        // 連接資料庫並執行查詢操作
        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, loginUsername);
            pstmt.setString(2, loginPassword);

            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                JOptionPane.showMessageDialog(this, "Login successful!");
            } else {
                JOptionPane.showMessageDialog(this, "Invalid username or password.");
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Login failed: " + e.getMessage());
        }
    }
}