package iuh.fit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

/**
 * @author TrungNguyen
 * @created 4/11/2026
 * @description
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String address;      // Số nhà, tên đường

    private String ward;         // Phường/Xã

    private String district;     // Quận/Huyện/Thị xã

    private String province;     // Tỉnh/Thành phố trực thuộc TW

    private String postalCode;   // Mã bưu chính (không bắt buộc)
}
