import bcrypt from "bcrypt";

export default function confirmPasswordHash(plainPassword?: string, hashedPassword?: string) {
  if (plainPassword && hashedPassword)
    return new Promise((resolve) => {
      bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
        resolve(res);
      });
    });
}
