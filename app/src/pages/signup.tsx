import React from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from '@/components/Common/Iconify/icons';
import { RootStore } from "@/store/root";
import { ToastPlugin } from "@/store/module/Toast/Toast";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/trpc";
import { GradientBackground } from "@/components/Common/GradientBackground";
import { Link, useNavigate } from "react-router-dom";
export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <GradientBackground>
      <div className="flex h-full w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <p className="pb-4 text-left text-3xl font-semibold">
            {t('sign-up')}
            <span aria-label="emoji" className="ml-2" role="img">
              👋
            </span>
          </p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              isRequired
              label={t('username')}
              labelPlacement="outside"
              name="username"
              placeholder={t('enter-your-username')}
              type="text"
              variant="bordered"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label={t('password')}
              labelPlacement="outside"
              name="password"
              placeholder={t('enter-your-password')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label={t('confirm-password')}
              labelPlacement="outside"
              name="confirmPassword"
              placeholder={t('confirm-your-password')}
              type={isConfirmVisible ? "text" : "password"}
              variant="bordered"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <Button color="primary" type="submit" onPress={async e => {
              if (!user || !password || !password2) {
                return RootStore.Get(ToastPlugin).error(t('required-items-cannot-be-empty'))
              }
              if (password != password2) {
                return RootStore.Get(ToastPlugin).error(t('the-two-passwords-are-inconsistent'))
              }
              try {
                await api.users.register.mutate({ name: user, password })
                RootStore.Get(ToastPlugin).success(t('create-successfully-is-about-to-jump-to-the-login'))
                setTimeout(() => {
                  navigate('/signin')
                }, 1000)
              } catch (error) {
                return RootStore.Get(ToastPlugin).error(error.message)
              }
            }}>
              {t('sign-up')}
            </Button>
          </form>
          <p className="text-center text-small">
            <Link to="/signin">
              {t('already-have-an-account-direct-login')}
            </Link>
          </p>
        </div>
      </div>
    </GradientBackground>
  );
}
