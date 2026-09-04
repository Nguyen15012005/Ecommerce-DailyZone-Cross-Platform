package iuh.fit.backend.config;

/**
 * @author TrungNguyen
 * @created 4/15/2026
 * @description
 */

public class JWT_CONSTANT {
    public static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY");
    public static final String JWT_HEADER = "Authorization";
}
