import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MainInterface {
    public static void main(String[] args) {
        // 創建主框架
        JFrame frame = new JFrame("User Management System");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300, 200);
        frame.setLayout(new GridLayout(3, 1));

        // 創建按鈕
        JButton registerButton = new JButton("Register");
        JButton loginButton = new JButton("Login");
        JButton forgotPasswordButton = new JButton("Forgot Password");

        // 註冊按鈕的點擊事件，打開註冊介面
        registerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                new Register();
            }
        });

        // 登入按鈕的點擊事件，打開登入介面
        loginButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                new Login();
            }
        });

        // 忘記密碼按鈕的點擊事件，打開忘記密碼介面
        forgotPasswordButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                new ForgotPassword();
            }
        });

        // 將按鈕添加到框架
        frame.add(registerButton);
        frame.add(loginButton);
        frame.add(forgotPasswordButton);

        // 設置框架可見
        frame.setVisible(true);
    }
}