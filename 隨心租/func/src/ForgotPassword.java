import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class ForgotPassword extends JFrame {
    private JTextField emailField;

    public ForgotPassword() {
        // 設置忘記密碼介面框架
        setTitle("Forgot Password");
        setSize(300, 100);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new GridLayout(2, 2));

        // 添加備用郵箱標籤和輸入框
        add(new JLabel("Backup Email:"));
        emailField = new JTextField();
        add(emailField);

        // 添加取回密碼按鈕及其點擊事件處理
        JButton retrieveButton = new JButton("Retrieve Password");
        retrieveButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                retrievePassword();
            }
        });
        add(retrieveButton);

        // 設置框架可見
        setVisible(true);
    }

    private void retrievePassword() {
        // 資料庫連接信息
        String url = "jdbc:mysql://localhost:3306/member";
        String username = "root";
        String password = "1234567890";

        // 獲取使用者輸入的備用郵箱
        String backupEmail = emailField.getText();

        // SQL 查詢語句
        String sql = "SELECT password FROM users WHERE backup_email = ?";

        // 連接資料庫並執行查詢操作
        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, backupEmail);

            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                String retrievedPassword = rs.getString("password");
                JOptionPane.showMessageDialog(this, "Your password is: " + retrievedPassword);
            } else {
                JOptionPane.showMessageDialog(this, "No user found with the given backup email.");
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Password retrieval failed: " + e.getMessage());
        }
    }
}