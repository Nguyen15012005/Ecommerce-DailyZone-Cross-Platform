package iuh.fit.backend.service.impl;

import iuh.fit.backend.config.JwtProvider;
import iuh.fit.backend.domain.AccountStatus;
import iuh.fit.backend.domain.UserRole;
import iuh.fit.backend.exception.SellerException;
import iuh.fit.backend.model.Address;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.repository.AddressRepository;
import iuh.fit.backend.repository.SellerRepository;
import iuh.fit.backend.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws Exception {
        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if (sellerExist != null){
            throw new Exception("Seller already exist, used different email");
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setMST(seller.getMST());
        newSeller.setRole(UserRole.SELLER);
        newSeller.setPhone(seller.getPhone());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());
        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);

        if (seller == null){
            throw new Exception("Seller not found ...");
        }
        return seller;
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id).orElseThrow(()-> new SellerException("seller not found with id" + id));
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        Seller existingSeller = this.getSellerById(id);

        if (seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }

        if (seller.getPhone() != null) {
            existingSeller.setPhone(seller.getPhone());
        }

        if (seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        // Business Details
        if (seller.getBusinessDetails() != null) {

            if (seller.getBusinessDetails().getBusinessName() != null) {
                existingSeller.getBusinessDetails()
                        .setBusinessName(seller.getBusinessDetails().getBusinessName());
            }

            if (seller.getBusinessDetails().getBusinessAddress() != null) {
                existingSeller.getBusinessDetails()
                        .setBusinessAddress(seller.getBusinessDetails().getBusinessAddress());
            }

            if (seller.getBusinessDetails().getBusinessPhone() != null) {
                existingSeller.getBusinessDetails()
                        .setBusinessPhone(seller.getBusinessDetails().getBusinessPhone());
            }

            if (seller.getBusinessDetails().getBusinessEmail() != null) {
                existingSeller.getBusinessDetails()
                        .setBusinessEmail(seller.getBusinessDetails().getBusinessEmail());
            }
        }

        // Bank Details
        if (seller.getBankDetails() != null) {

            if (seller.getBankDetails().getAccountHolderName() != null) {
                existingSeller.getBankDetails()
                        .setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            }

            if (seller.getBankDetails().getAccountNumber() != null) {
                existingSeller.getBankDetails()
                        .setAccountNumber(seller.getBankDetails().getAccountNumber());
            }

            if (seller.getBankDetails().getBankName() != null) {
                existingSeller.getBankDetails()
                        .setBankName(seller.getBankDetails().getBankName());
            }

            if (seller.getBankDetails().getBranch() != null) {
                existingSeller.getBankDetails()
                        .setBranch(seller.getBankDetails().getBranch());
            }
        }

        // Pickup Address
        if (seller.getPickupAddress() != null) {

            if (seller.getPickupAddress().getAddress() != null) {
                existingSeller.getPickupAddress()
                        .setAddress(seller.getPickupAddress().getAddress());
            }

            if (seller.getPickupAddress().getDistrict() != null) {
                existingSeller.getPickupAddress()
                        .setDistrict(seller.getPickupAddress().getDistrict());
            }

            if (seller.getPickupAddress().getProvince() != null) {
                existingSeller.getPickupAddress()
                        .setProvince(seller.getPickupAddress().getProvince());
            }

            if (seller.getPickupAddress().getPostalCode() != null) {
                existingSeller.getPickupAddress()
                        .setPostalCode(seller.getPickupAddress().getPostalCode());
            }

            if (seller.getPickupAddress().getPhone() != null) {
                existingSeller.getPickupAddress()
                        .setPhone(seller.getPickupAddress().getPhone());
            }
        }

        if (seller.getMST() != null) {
            existingSeller.setMST(seller.getMST());
        }

        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {

        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);

    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
}
















