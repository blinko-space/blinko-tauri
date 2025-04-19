System.register([], (n) => ({
  execute: () => {
    n("default", class {
      constructor() {
        Object.assign(this, { name: "blinko-copy-private-link", author: "blinko-offical", url: "https://github.com/blinko-space/blinko-plugin-copy-private-link", version: "0.0.2", minAppVersion: "0.39.0", displayName: { default: "Copy Private Link", zh: "右键复制私有链接" }, description: { default: "add right click menu to copy private link", zh: "增加右键菜单，用于复制私有链接" }, readme: { default: "README.md" } });
      }
      async init() {
        this.initI18n();
        const i = window.Blinko.i18n;
        window.Blinko.addRightClickMenu({
          name: "copy-private-link",
          label: i.t("copyPrivateLink"),
          icon: "material-symbols:link-rounded",
          onClick: (e) => {
            const o = `${window.location.origin}/detail?id=${e.id}`;
            try {
              window.Blinko.copyToClipboard ? window.Blinko.copyToClipboard(o) : navigator.clipboard.writeText(o), window.Blinko.toast.success(i.t("copySuccess"));
            } catch (t) {
              console.error(t);
            }
          }
        });
      }
      /**
       * Initializes internationalization resources
       * Adds English and Chinese translation bundles
       */
      initI18n() {
        window.Blinko.i18n.addResourceBundle("en", "translation", { copyPrivateLink: "Copy Private Link", copySuccess: "Copy Successed" }), window.Blinko.i18n.addResourceBundle("zh", "translation", { copyPrivateLink: "复制私有链接", copySuccess: "复制成功" });
      }
      /**
       * Cleanup function called when plugin is disabled
       */
      destroy() {
        console.log("Plugin destroyed");
      }
    });
  }
}));
