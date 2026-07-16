import { authApi } from "../api/authApi";
import { databaseApi } from "../api/databaseApi";
import { walletService } from "./walletService";

export const userService = {
  mapUserToDocumentSchema(rawInputData) {
    const computedBalance = walletService.calculateStartingBalance(rawInputData.selectedPackage);
    return {
      uid: String(rawInputData.uid).trim(),
      fullName: String(rawInputData.fullName).trim(),
      email: String(rawInputData.email).trim().toLowerCase(),
      username: String(rawInputData.username).trim().replace(/\s+/g, ""),
      selectedPackage: String(rawInputData.selectedPackage).toUpperCase(),
      availableBalance: Number(computedBalance),
      accountStatus: "PENDING_ACTIVATION",
      createdAt: new Date().toISOString(),
      metadata: {
        platformSource: "NEXTEL_AFFILIATE_V1",
        lastLoginAt: new Date().toISOString()
      }
    };
  },

  async registerNewAffiliateTransaction(formPayload) {
    const { email, password, fullName, username, selectedPackage } = formPayload;

    if (!username || username.length < 3) {
      throw new Error("REGISTRATION FAILED: Username must be at least 3 characters long.");
    }
    if (!walletService.isValidPackage(selectedPackage)) {
      throw new Error("REGISTRATION FAILED: Invalid or modified package tier selection.");
    }

    const cleanEmail = email.trim();
    const credentialNode = await authApi.registerUserNode(cleanEmail, password);
    const generatedUid = credentialNode.user.uid;

    const schemaData = this.mapUserToDocumentSchema({
      uid: generatedUid,
      fullName,
      email: cleanEmail,
      username,
      selectedPackage
    });

    await databaseApi.saveUserDocument(generatedUid, schemaData);
    return schemaData;
  },

  async authenticateAffiliateTransaction(email, password) {
    const credentialNode = await authApi.loginUserNode(email.trim(), password);
    const existingUid = credentialNode.user.uid;
    const userProfile = await databaseApi.fetchUserDocument(existingUid);

    if (!userProfile) {
      throw new Error("SYSTEM EXCEPTION: Authenticated profile collection document missing.");
    }

    return userProfile;
  }
};




