/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { PersonalDashboardSchemaProjectOwnersItemOwnerType } from './personalDashboardSchemaProjectOwnersItemOwnerType';

export type PersonalDashboardSchemaProjectOwnersItem = {
    /**
     * The user's email address.
     * @nullable
     */
    email?: string | null;
    /**
     * The URL of the user's profile image.
     */
    imageUrl: string;
    /** The name displayed for the user. Can be the user's name, username, or email, depending on what they have provided. */
    name: string;
    /** The type of the owner; will always be `user`. */
    ownerType: PersonalDashboardSchemaProjectOwnersItemOwnerType;
};
