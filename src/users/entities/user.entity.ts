import { Column, Entity, PrimaryGeneratedColumn, VirtualColumn } from "typeorm";
const crypto = require("crypto");

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", nullable: true })
  resetPasswordToken: string;

  @Column({ type: "varchar" })
  encryptionHash: string;

  @Column({ type: "varchar" })
  encryptedPassword: string;

  @VirtualColumn({ query: () => "" })
  set password(password: string) {
    const encryptionHash = crypto.randomBytes(128).toString("base64");
    this.encryptionHash = encryptionHash;
    this.encryptedPassword = encrypt(password, encryptionHash);
  }

  verifyPassword(password: string): boolean {
    return encrypt(password, this.encryptionHash) === this.encryptedPassword;
  }
}

function encrypt(password: string, encryptionHash: string): string {
  return crypto
    .pbkdf2Sync(password, encryptionHash, 1, 128, "sha1")
    .toString("base64");
}
