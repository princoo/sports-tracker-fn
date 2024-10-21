export interface Site {
  id: string;
  name: string;
  province: string;
  district: string;
  coaches: SiteCoach[];
  createdAt: string;
  updatedAt: string;
}
export interface Test {
  id: string;
  name: string;
  description: string;
  requiredMetrics: String[];
  createdAt: string;
  updatedAt: string;
}
export interface SiteCoach {
  user: {
    id: string;
    email: string;
    userName: string;
    role: {
      roleName: string;
    };
    profile: {
      nationality: string;
      phone: string;
      firstName: string;
      lastName: string;
      avatarId: string | null;
    };
  };
}

export interface SitePayload {
  name: string;
  province: string;
  district: string;
}
export interface TestPayload {
  name: string;
  province: string;
  district: string;
}
