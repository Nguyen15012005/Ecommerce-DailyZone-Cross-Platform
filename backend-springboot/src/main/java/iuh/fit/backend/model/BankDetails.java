package iuh.fit.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author TrungNguyen
 * @created 4/11/2026
 * @description
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BankDetails {
    private String accountNumber;       // Số tài khoản
    private String accountHolderName;   // Chủ tài khoản
    private String bankName;            // Tên ngân hàng
    private String branch;              // Chi nhánh (không bắt buộc)
}
