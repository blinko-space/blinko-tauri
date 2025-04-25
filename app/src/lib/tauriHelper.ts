import { platform } from '@tauri-apps/plugin-os'
import { BaseDirectory } from '@tauri-apps/plugin-fs'
import { save } from '@tauri-apps/plugin-dialog'
import { helper } from './helper'
import { RootStore } from '@/store'
import { ToastPlugin } from '@/store/module/Toast/Toast'
import i18n from './i18n'
import { UserStore } from '@/store/user'
import { download } from '@tauri-apps/plugin-upload'
import { downloadDir, publicDir } from '@tauri-apps/api/path'
import { setStatusBarColor } from 'tauri-plugin-blinko-api'
/**
 * isAndroid
 * @returns wether the platform is android
 */
export function isAndroid() {
    try {
        return platform() === 'android';
    } catch (error) {
        return false
    }
}

export function isDesktop() {
    try {
       return platform() === 'macos' || platform() === 'windows' || platform() === 'linux';
    } catch (error) {
        return false
    }
}

export function isInTauri() {
    try {
        // @ts-ignore
        return typeof window !== 'undefined' && window.__TAURI__ !== undefined;
    } catch (error) {
        return false
    }
}

/**
 * downloadFromLink
 * @param uri download link
 * @param filename optional file name, if not provided, it will be extracted from the link
 * https://v2.tauri.app/plugin/file-system/#ios 
 */
export async function downloadFromLink(uri: string, filename?: string) {
    if (!isInTauri()) {
        helper.download.downloadByLink(uri)
        return;
    }

    try {
        RootStore.Get(ToastPlugin).loading(i18n.t('downloading'), { id: 'downloading' })

        if (!filename) {
            const url = new URL(uri);
            filename = url.pathname.split('/').pop() || 'downloaded_file';
        }

        const token = RootStore.Get(UserStore).tokenData.value?.token;
        const downloadUrl = token ? `${uri}?token=${token}` : uri;

        if (isAndroid()) {
            const downloadDirPath = await downloadDir();
            await download(
                downloadUrl,
                `${downloadDirPath}/${filename}`,
                ({ progress, total }) => {
                    console.log(`download progress: ${progress} / ${total} bytes`);
                },
                new Map([['Content-Type', 'application/octet-stream']])
            );

            RootStore.Get(ToastPlugin).dismiss('downloading');
            RootStore.Get(ToastPlugin).success(i18n.t('download-success') + ' ' + downloadDirPath);
        } else if (platform() !== 'ios') {
            const savePath = await save({
                filters: [
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ],
                defaultPath: filename
            });

            if (savePath) {
                await download(
                    downloadUrl,
                    savePath,
                    ({ progress, total }) => {
                        // console.log(`download progress: ${progress} / ${total} bytes`);
                    },
                    new Map([['Content-Type', 'application/octet-stream']])
                );

                RootStore.Get(ToastPlugin).dismiss('downloading');
                RootStore.Get(ToastPlugin).success(i18n.t('download-success'));
            }
        }

        //todo: IOS download
    } catch (error) {
        RootStore.Get(ToastPlugin).dismiss('downloading');
        RootStore.Get(ToastPlugin).error(`${i18n.t('download-failed')}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export function setTauriTheme(theme: any) {
    if (isAndroid()) {
        const lightColor = '#f8f8f8';
        const darkColor = '#1C1C1E';
        setStatusBarColor(theme === 'light' ? lightColor : darkColor);
    }
}