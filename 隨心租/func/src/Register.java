import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class Register extends JFrame {
    private JTextField usernameField;
    private JPasswordField passwordField;
    private JTextField emailField;

    public Register() {
        // 設置註冊介面框架
        setTitle("Register");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new GridLayout(4, 2));

        // 添加使用者名標籤和輸入框
        add(new JLabel("Username:"));
        usernameField = new JTextField();
        add(usernameField);

        // 添加密碼標籤和輸入框
        add(new JLabel("Password:"));
        passwordField = new JPasswordField();
        add(passwordField);

        // 添加備用郵箱標籤和輸入框
        add(new JLabel("Backup Email:"));
        emailField = new JTextField();
        add(emailField);

        // 添加註冊按鈕及其點擊事件處理
        JButton registerButton = new JButton("Register");
        registerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                register();
            }
        });
        add(registerButton);

        // 設置框架可見
        setVisible(true);
    }

    private void register() {
        // 資料庫連接信息
        String url = "jdbc:mysql://localhost:3306/member";
        String username = "root";
        String password = "1234567890";

        // 獲取使用者輸入的資料
        String newUsername = usernameField.getText();
        String newPassword = new String(passwordField.getPassword());
        String backupEmail = emailField.getText();

        // SQL 插入語句
        String sql = "INSERT INTO users (username, password, backup_email) VALUES (?, ?, ?)";

        // 連接資料庫並執行插入操作
        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, newUsername);
            pstmt.setString(2, newPassword);
            pstmt.setString(3, backupEmail);

            int row = pstmt.executeUpdate();
            if (row > 0) {
                JOptionPane.showMessageDialog(this, "Registration successful!");
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Registration failed: " + e.getMessage());
        }
    }
}