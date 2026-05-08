const sourceStorageKey = "kpop_banner_chart_source_v1";
const periodStorageKey = "kpop_banner_chart_period_v1";

export function createKpopBanner105Storage() {
  let bannerCloseUntilKey = "kpop_banner_hidden_until_v2:anon";
  let likeCelebrationStateKey = "kpop_banner_like_celebration_v1:anon";

  return {
    setBannerStorageScope(userId) {
      const scope = userId ? `u${userId}` : "anon";
      bannerCloseUntilKey = `kpop_banner_hidden_until_v2:${scope}`;
      likeCelebrationStateKey = `kpop_banner_like_celebration_v1:${scope}`;
    },

    getStoredSource() {
      return "ichart";
    },

    setStoredSource() {
      try {
        window?.localStorage?.removeItem(sourceStorageKey);
      } catch {
        return;
      }
    },

    getStoredPeriod() {
      return "day";
    },

    setStoredPeriod() {
      try {
        window?.localStorage?.removeItem(periodStorageKey);
      } catch {
        return;
      }
    },

    readLikeCelebrationState() {
      try {
        const raw = window?.localStorage?.getItem(likeCelebrationStateKey);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        return {};
      }
    },

    writeLikeCelebrationState(state) {
      try {
        window?.localStorage?.setItem(likeCelebrationStateKey, JSON.stringify(state));
      } catch {
        return;
      }
    },

    getHiddenUntil() {
      try {
        const value = Number(window?.localStorage?.getItem(bannerCloseUntilKey) || 0);
        return Number.isFinite(value) ? value : 0;
      } catch {
        return 0;
      }
    },

    setHiddenUntil(timestamp) {
      try {
        window?.localStorage?.setItem(bannerCloseUntilKey, String(timestamp));
      } catch {
        return;
      }
    },

    clearHiddenUntil() {
      try {
        window?.localStorage?.removeItem(bannerCloseUntilKey);
      } catch {
        return;
      }
    },
  };
}
