import { observer } from 'mobx-react-lite';
import { Autocomplete, AutocompleteItem, Button, Code, Input, Select, SelectItem, Switch, Tooltip, Chip, Slider, Textarea } from '@heroui/react';
import { RootStore } from '@/store';
import { BlinkoStore } from '@/store/blinkoStore';
import { PromiseCall } from '@/store/standard/PromiseState';
import { Icon } from '@/components/Common/Iconify/icons';
import { api } from '@/lib/trpc';
import { AiStore } from '@/store/aiStore';
import { useTranslation } from 'react-i18next';
import { Item, ItemWithTooltip } from './Item';
import { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ShowRebuildEmbeddingProgressDialog } from '../Common/RebuildEmbeddingProgress';
import { showTipsDialog } from '../Common/TipsDialog';
import TagSelector from '@/components/Common/TagSelector';
import { CollapsibleCard } from '../Common/CollapsibleCard';
import { ToastPlugin } from '@/store/module/Toast/Toast';
import axios from 'axios';
import { StorageListState } from '@/store/standard/StorageListState';
import { IconButton } from '../Common/Editor/Toolbar/IconButton';

export const AiSetting = observer(() => {
  const blinko = RootStore.Get(BlinkoStore);
  const ai = RootStore.Get(AiStore);
  const { t } = useTranslation();
  const isPc = useMediaQuery('(min-width: 768px)');
  const [rebuildProgress, setRebuildProgress] = useState<{ percentage: number; isRunning: boolean } | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRebuildProgress = async () => {
    try {
      const data = await api.ai.rebuildEmbeddingProgress.query();
      if (data) {
        setRebuildProgress({
          percentage: data.percentage,
          isRunning: data.isRunning,
        });

        if (data.isRunning && !pollingIntervalRef.current) {
          startPolling();
        } else if (!data.isRunning && pollingIntervalRef.current) {
          stopPolling();
        }
      }
    } catch (error) {
      console.error('Error fetching rebuild progress:', error);
    }
  };

  const startPolling = () => {
    if (!pollingIntervalRef.current) {
      fetchRebuildProgress();
      pollingIntervalRef.current = setInterval(() => {
        fetchRebuildProgress();
      }, 2000);
    }
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchRebuildProgress();
    return () => {
      stopPolling();
    };
  }, []);

  const store = RootStore.Local(() => ({
    isVisible: false,
    isEmbeddingKeyVisible: false,
    apiKey: '',
    apiVersion: '',
    embeddingApiKey: '',
    aiCommentPrompt: '',
    aiTagsPrompt: '',
    embeddingApiEndpoint: '',
    apiEndPoint: '',
    aiModel: '',
    tavilyApiKey: '',
    embeddingModel: '',
    embeddingDimensions: 0,
    embeddingTopK: 2,
    embeddingScore: 1.5,
    embeddingLambda: 0.5,
    rerankModel: '',
    rerankTopK: 2,
    rerankScore: 0.75,
    rerankUseEembbingEndpoint: false,
    tavilyMaxResult: 5,
    showEmeddingAdvancedSetting: false,
    showRerankAdvancedSetting: false,
    excludeEmbeddingTagId: null as number | null,
    aiSmartEditPrompt: '',
    aiModelSelect: new StorageListState({ key: 'aiModelSelect' }),
    embeddingModelSelect: new StorageListState({ key: 'embeddingModelSelect' }),
    rerankModelSelect: new StorageListState({ key: 'rerankModelSelect' }),
    async fetchModels() {
      try {
        const provider = blinko.config.value?.aiModelProvider!;
        let modelList: any = [];
        const endpoint = new URL(blinko.config.value?.aiApiEndpoint!);
        if (provider === 'Ollama') {
          console.log(blinko.config.value?.aiApiEndpoint);
          let { data } = await axios.get(`${!!endpoint ? endpoint.origin : 'http://127.0.0.1:11434/api'}/tags`);
          modelList = data.models.map(model => ({
            label: model.name,
            value: model.name
          }));
          this.aiModelSelect.save(modelList);
          this.embeddingModelSelect.save(modelList);
          this.rerankModelSelect.save(modelList);
        } else {
          try {
            let { data } = await axios.get(`${!!endpoint ? endpoint.href : 'https://api.openai.com'}/models`, {
              headers: {
                'Authorization': `Bearer ${blinko.config.value?.aiApiKey}`
              }
            });
            modelList = data.data.map(model => ({
              label: model.id,
              value: model.id
            }));
            this.aiModelSelect.save(modelList);
            this.embeddingModelSelect.save(modelList);
            this.rerankModelSelect.save(modelList);
          } catch (error) {
            RootStore.Get(ToastPlugin).error(error.message || 'ERROR');
          }
        }
        if (blinko.config.value?.embeddingApiEndpoint) {
          const embeddingEndpoint = new URL(blinko.config.value?.embeddingApiEndpoint);
          let { data } = await axios.get(`${!!embeddingEndpoint ? embeddingEndpoint.href : 'https://api.openai.com'}/models`, {
            headers: {
              'Authorization': `Bearer ${blinko.config.value?.embeddingApiKey}`
            }
          });
          this.embeddingModelSelect.save(data.data.map(model => ({
            label: model.id,
            value: model.id
          })));
          if (this.rerankUseEembbingEndpoint) {
            this.rerankModelSelect.save(data.data.map(model => ({
              label: model.id,
              value: model.id
            })));
          }
        }
        RootStore.Get(ToastPlugin).success(t('model-list-updated'));
      } catch (error) {
        console.log(error);
        RootStore.Get(ToastPlugin).error(error.message || 'ERROR');
      }
    }
  }));

  useEffect(() => {
    store.apiEndPoint = blinko.config.value?.aiApiEndpoint!;
    store.apiVersion = blinko.config.value?.aiApiVersion!;
    store.apiKey = blinko.config.value?.aiApiKey!;
    store.aiModel = blinko.config.value?.aiModel!;
    store.embeddingModel = blinko.config.value?.embeddingModel!;
    store.embeddingTopK = blinko.config.value?.embeddingTopK!;
    store.embeddingScore = blinko.config.value?.embeddingScore!;
    store.embeddingLambda = blinko.config.value?.embeddingLambda!;
    store.embeddingApiEndpoint = blinko.config.value?.embeddingApiEndpoint!;
    store.embeddingApiKey = blinko.config.value?.embeddingApiKey!;
    store.excludeEmbeddingTagId = blinko.config.value?.excludeEmbeddingTagId!;
    store.embeddingDimensions = blinko.config.value?.embeddingDimensions!;
    store.tavilyApiKey = blinko.config.value?.tavilyApiKey!;
    store.tavilyMaxResult = Number(blinko.config.value?.tavilyMaxResult!);
    store.aiCommentPrompt = blinko.config.value?.aiCommentPrompt!;
    store.aiTagsPrompt = blinko.config.value?.aiTagsPrompt!;
    store.aiSmartEditPrompt = blinko.config.value?.aiSmartEditPrompt!;
    store.rerankModel = blinko.config.value?.rerankModel!;
    store.rerankTopK = blinko.config.value?.rerankTopK || 2;
    store.rerankScore = blinko.config.value?.rerankScore || 0.75;
    store.rerankUseEembbingEndpoint = blinko.config.value?.rerankUseEembbingEndpoint || false;
  }, [blinko.config.value]);

  return (
    <>
      <CollapsibleCard icon="hugeicons:ai-magic" title="AI">
        <Item
          leftContent={
            <ItemWithTooltip
              content={<>{t('use-ai')}</>}
              toolTipContent={
                <div className="w-[300px] flex flex-col gap-2">
                  <div>
                    {t('in-addition-to-the-gpt-model-there-is-a-need-to-ensure-that-it-is-possible-to-invoke-the')}
                    <Code color="primary">text-embedding</Code>
                  </div>
                  <div>
                    {t('speech-recognition-requires-the-use-of')}
                    <Code color="primary">whisper</Code>
                  </div>
                </div>
              }
            />
          }
          rightContent={
            <Switch
              isSelected={blinko.config.value?.isUseAI}
              onChange={(e) => {
                PromiseCall(
                  api.config.update.mutate({
                    key: 'isUseAI',
                    value: e.target.checked,
                  }),
                  { autoAlert: false },
                );
                window.location.reload();
              }}
            />
          }
        />
        <Item
          leftContent={<>{t('model-provider')}</>}
          rightContent={
            <Select
              radius="lg"
              selectedKeys={[blinko.config.value?.aiModelProvider!]}
              onSelectionChange={(key) => {
                const value = Array.from(key)[0] as string;
                blinko.config.value!.aiModelProvider = value as any;
                PromiseCall(
                  api.config.update.mutate({
                    key: 'aiModelProvider',
                    value: value,
                  }),
                  { autoAlert: false },
                );
              }}
              size="sm"
              className="w-[200px]"
              label={t('select-model-provider')}
            >
              {ai.modelProviderSelect.map((item) => (
                <SelectItem key={item.value ?? ''} startContent={item.icon}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          }
        />

        <div style={{ display: 'none' }}>
          <input type="text" autoComplete="true" />
        </div>

        <Item
          leftContent={<>{t('model')}</>}
          rightContent={
            <div className="flex items-center gap-2">
              <Autocomplete
                name={`embedding-model-${Math.random()}`}
                radius="lg"
                allowsCustomValue={true}
                isClearable={false}
                selectedKey={store.aiModel ?? ''}
                inputValue={store.aiModel ?? ''}
                onInputChange={(e) => {
                  store.aiModel = e;
                }}
                onBlur={(e) => {
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'aiModel',
                      value: store.aiModel,
                    }),
                    { autoAlert: false },
                  );
                }}
                onSelectionChange={(key) => {
                  store.aiModel = key as string;
                }}
                size="sm"
                className="w-[200px] md:w-[300px]"
                label={t('select-model')}
              >
                {store.aiModelSelect.list.map((item) => (
                  <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
                ))}
              </Autocomplete>
              <Tooltip content={t('refresh-model-list')}>
                <Button
                  size="sm"
                  color="primary"
                  variant='light'
                  isIconOnly
                  onPress={() => store.fetchModels()}
                >
                  <Icon icon="mage:box-3d-download" width={18} height={18} />
                </Button>
              </Tooltip>
            </div>
          }
        />

        {(blinko.config.value?.aiModelProvider == 'OpenAI' || blinko.config.value?.aiModelProvider == 'Ollama') && (
          <Item
            type={isPc ? 'row' : 'col'}
            leftContent={
              <div className="flex flex-col gap-1">
                <>{t('endpoint')}</>
                {blinko.config.value?.aiModelProvider == 'Ollama' ? <div className="text-desc text-xs">http://127.0.0.1:11434/api</div>
                  : <div className="text-desc text-xs">{new URL(!!store.apiEndPoint ? store.apiEndPoint : 'https://api.openai.com').href + 'chat/completions'}</div>}
              </div>
            }
            rightContent={
              <div className="flex gap-2 items-center">
                <Input
                  size="sm"
                  label={t('api-endpoint')}
                  variant="bordered"
                  className="w-full md:w-[300px]"
                  placeholder="https://api.openapi.com/v1/"
                  value={store.apiEndPoint}
                  onChange={(e) => {
                    store.apiEndPoint = e.target.value;
                  }}
                  onBlur={(e) => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'aiApiEndpoint',
                        value: store.apiEndPoint,
                      }),
                      { autoAlert: false },
                    );
                  }}
                />
                <IconButton
                  icon="hugeicons:connect"
                  containerSize={40}
                  tooltip={<div>{t('check-connect')}</div>}
                  onClick={async (e) => {
                    if (!blinko.config.value?.embeddingModel) {
                      RootStore.Get(ToastPlugin).error(t('please-set-the-embedding-model'));
                      return;
                    }
                    RootStore.Get(ToastPlugin).promise(api.ai.testConnect.mutate(), {
                      loading: t('loading'),
                      success: t('check-connect-success'),
                      error: t('check-connect-error'),
                    });
                  }}
                />
              </div>
            }
          />
        )}


        {
          blinko.config.value?.aiModelProvider != 'Ollama' &&
          <Item
            type={isPc ? 'row' : 'col'}
            leftContent={<div className="flex flex-col ga-1">
              <div>API Key</div>
              <div className="text-desc text-xs">{t('user-custom-openai-api-key')}</div>
            </div>}
            rightContent={
              <Input
                size='sm'
                label="API key"
                variant="bordered"
                className="w-full md:w-[300px]"
                placeholder="Enter your api key"
                value={store.apiKey}
                onChange={e => { store.apiKey = e.target.value }}
                onBlur={e => {
                  PromiseCall(api.config.update.mutate({
                    key: 'aiApiKey',
                    value: store.apiKey.trim()
                  }), { autoAlert: false })
                }}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={e => store.isVisible = !store.isVisible} aria-label="toggle password visibility">
                    {store.isVisible ? (
                      <Icon icon="mdi:eye-off" width="20" height="20" />
                    ) : (
                      <Icon icon="mdi:eye" width="20" height="20" />
                    )}
                  </button>
                }
                type={store.isVisible ? "text" : "password"}
              />
            } />
        }

        {
          blinko.config.value?.aiModelProvider == 'AzureOpenAI' &&
          <Item
            type={isPc ? 'row' : 'col'}
            leftContent={<div className="flex flex-col ga-1">
              <>{t('user-custom-azureopenai-api-version')}</>
            </div>}
            rightContent={
              <Input
                variant="bordered"
                className="w-full md:w-[300px]"
                placeholder="Enter API version"
                value={store.apiVersion}
                onChange={e => { store.apiVersion = e.target.value }}
                onBlur={e => {
                  PromiseCall(api.config.update.mutate({
                    key: 'aiApiVersion',
                    value: store.apiVersion
                  }), { autoAlert: false })
                }}
                type="text"
              />
            } />
        }


        <Item
          type={isPc ? 'row' : 'col'}
          leftContent={
            <div className="flex flex-col  gap-2">
              <div>{t('rebuild-embedding-index')}</div>
              <div className="text-desc text-xs">{t('notes-imported-by-other-means-may-not-have-embedded-vectors')}</div>
            </div>
          }
          rightContent={
            <div className="flex w-full ml-auto justify-end gap-2">
              <Button
                color="danger"
                startContent={
                  rebuildProgress?.isRunning ? (
                    <div className="flex items-center gap-1">
                      <Icon icon="line-md:loading-twotone-loop" width="20" height="20" />
                      {rebuildProgress.percentage}%
                    </div>
                  ) : (
                    <Icon icon="mingcute:refresh-4-ai-line" width="20" height="20" />
                  )
                }
                onPress={() => {
                  if (rebuildProgress?.isRunning) {
                    showTipsDialog({
                      title: t('rebuild-in-progress'),
                      content: t('there-is-a-rebuild-task-in-progress-do-you-want-to-restart'),
                      onConfirm: async () => {
                        await api.ai.rebuildEmbeddingStart.mutate({ force: true });
                        setRebuildProgress((prev) => ({
                          percentage: 0,
                          isRunning: true,
                        }));
                        startPolling();
                        ShowRebuildEmbeddingProgressDialog(true);
                      },
                    });
                  } else {
                    showTipsDialog({
                      title: t('force-rebuild-embedding-index'),
                      content: t('if-you-have-a-lot-of-notes-you-may-consume-a-certain-number-of-tokens'),
                      onConfirm: async () => {
                        await api.ai.rebuildEmbeddingStart.mutate({ force: true });
                        setRebuildProgress((prev) => ({
                          percentage: 0,
                          isRunning: true,
                        }));
                        startPolling();
                        ShowRebuildEmbeddingProgressDialog(true);
                      },
                    });
                  }
                }}
              >
                {!!rebuildProgress?.isRunning ? t('rebuild-in-progress') : t('force-rebuild')}
              </Button>
            </div>
          }
        />
      </CollapsibleCard>


      <CollapsibleCard icon="mingcute:vector-line" title={t('embedding-model')} className="mt-4">
        <Item
          type={isPc ? 'row' : 'col'}
          leftContent={
            <div className="flex items-center gap-2">
              <ItemWithTooltip
                content={<>{t('embedding-model')}</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('embedding-model-description')}</div>
                  </div>
                }
              />
              <Chip size="sm" color="warning" className="text-white cursor-pointer" onClick={() => (store.showEmeddingAdvancedSetting = !store.showEmeddingAdvancedSetting)}>
                {t('advanced')}
              </Chip>
            </div>
          }
          rightContent={
            <div className="flex w-full ml-auto justify-start items-center gap-2">
              <Autocomplete
                radius="lg"
                isClearable={false}
                allowsCustomValue={true}
                inputValue={store.embeddingModel ?? ''}
                selectedKey={store.embeddingModel ?? ''}
                autoComplete="off"
                onInputChange={(e) => {
                  store.embeddingModel = e;
                }}
                onBlur={(e) => {
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'embeddingModel',
                      value: store.embeddingModel,
                    }),
                    { autoAlert: false },
                  );
                }}
                onSelectionChange={(key) => {
                  store.embeddingModel = key as string;
                }}
                size="sm"
                className={`${isPc ? 'w-[250px]' : 'w-full'}`}
                label={t('embedding-model')}
              >
                {store.embeddingModelSelect.list.map((item) => (
                  <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
                ))}
              </Autocomplete>


              {
                store.embeddingApiEndpoint &&
                <Tooltip content={t('refresh-model-list')}>
                  <Button
                    size="sm"
                    color="primary"
                    variant='light'
                    isIconOnly
                    onPress={() => store.fetchModels()}
                  >
                    <Icon icon="mage:box-3d-download" width={18} height={18} />
                  </Button>
                </Tooltip>
              }
            </div>
          }
        />

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={<>{t('embedding-api-endpoint')}</>}
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start items-center">
                <Input
                  size="sm"
                  label={t('api-endpoint')}
                  variant="bordered"
                  autoComplete="off"
                  className="w-full"
                  placeholder="https://api.openapi.com/v1/"
                  value={store.embeddingApiEndpoint}
                  onChange={(e) => {
                    store.embeddingApiEndpoint = e.target.value;
                  }}
                  onBlur={() => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'embeddingApiEndpoint',
                        value: store.embeddingApiEndpoint,
                      }),
                      { autoAlert: false },
                    );
                  }}
                />
              </div>
            }
          />
        )}

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={<>{t('embedding-api-key')}</>}
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start">
                <Input
                  size="sm"
                  label="API key"
                  variant="bordered"
                  className="w-full"
                  placeholder="Enter your embedding api key"
                  value={store.embeddingApiKey}
                  onChange={(e) => {
                    store.embeddingApiKey = e.target.value;
                  }}
                  onBlur={() => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'embeddingApiKey',
                        value: store.embeddingApiKey,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={(e) => (store.isEmbeddingKeyVisible = !store.isEmbeddingKeyVisible)}>
                      {store.isEmbeddingKeyVisible ? <Icon icon="mdi:eye-off" width="20" height="20" /> : <Icon icon="mdi:eye" width="20" height="20" />}
                    </button>
                  }
                  type={store.isEmbeddingKeyVisible ? 'text' : 'password'}
                />
              </div>
            }
          />
        )}

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <ItemWithTooltip
                content={<>{t('embedding-dimensions')}</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('embedding-dimensions-description')}</div>
                  </div>
                }
              />
            }
            rightContent={
              <div className="flex md:w-[100px] w-full ml-auto justify-start">
                <Input
                  type="number"
                  size="sm"
                  variant="bordered"
                  //@ts-ignore
                  value={store.embeddingDimensions}
                  onChange={(e) => {
                    store.embeddingDimensions = Number(e.target.value);
                  }}
                  onBlur={() => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'embeddingDimensions',
                        value: store.embeddingDimensions,
                      }),
                      { autoAlert: false },
                    );
                  }}
                />
              </div>
            }
          />
        )}

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <ItemWithTooltip
                content={<>Top K</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('top-k-description')}</div>
                  </div>
                }
              />
            }
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start">
                <Slider
                  onChangeEnd={(e) => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'embeddingTopK',
                        value: store.embeddingTopK,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  onChange={(e) => {
                    store.embeddingTopK = Number(e);
                  }}
                  value={store.embeddingTopK}
                  size="md"
                  step={1}
                  color="foreground"
                  label={'value'}
                  showSteps={false}
                  maxValue={50}
                  minValue={1}
                  defaultValue={2}
                  className="w-full"
                />
              </div>
            }
          />
        )}

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <ItemWithTooltip
                content={<>Score</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('embedding-score-description')}</div>
                  </div>
                }
              />
            }
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start">
                <Slider
                  onChangeEnd={(e) => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'embeddingScore',
                        value: store.embeddingScore,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  onChange={(e) => {
                    store.embeddingScore = Number(e);
                  }}
                  value={store.embeddingScore}
                  size="md"
                  step={0.01}
                  color="foreground"
                  label={'value'}
                  showSteps={false}
                  maxValue={1.0}
                  minValue={0.2}
                  defaultValue={0.75}
                  className="w-full"
                />
              </div>
            }
          />
        )}

        {store.showEmeddingAdvancedSetting && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <div className="flex flex-col gap-1">
                <ItemWithTooltip content={<>{t('exclude-tag-from-embedding')}</>} toolTipContent={t('exclude-tag-from-embedding-tip')} />
                <div className="text-desc text-xs">{t('exclude-tag-from-embedding-desc')}</div>
              </div>
            }
            rightContent={
              <TagSelector
                selectedTag={store.excludeEmbeddingTagId?.toString() || null}
                onSelectionChange={(key) => {
                  store.excludeEmbeddingTagId = key ? Number(key) : null;
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'excludeEmbeddingTagId',
                      value: key ? Number(key) : null,
                    }),
                    { autoAlert: false },
                  );
                }}
              />
            }
          />
        )}


        <Item
          type={isPc ? 'row' : 'col'}
          leftContent={
            <div className="flex items-center gap-2">
              <ItemWithTooltip
                content={<>{t('rerank-model')}</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('rerank-model-description')}</div>
                  </div>
                }
              />
              <Chip size="sm" color="warning" className="text-white cursor-pointer" onClick={() => (store.showRerankAdvancedSetting = !store.showRerankAdvancedSetting)}>
                {t('advanced')}
              </Chip>
            </div>
          }
          rightContent={
            <div className="flex md:w-[300px] w-full ml-auto justify-start items-center gap-2">
              <Autocomplete
                key={'rerank-model'}
                name={`rerank-model-${Math.random()}`}
                radius="lg"
                allowsCustomValue={true}
                inputValue={store.rerankModel ?? ''}
                selectedKey={store.rerankModel ?? ''}
                onInputChange={(e) => {
                  store.rerankModel = e;
                }}
                isClearable={false}
                autoComplete="off"
                onBlur={(e) => {
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'rerankModel',
                      value: store.rerankModel,
                    }),
                    { autoAlert: false },
                  );
                }}
                onSelectionChange={(key) => {
                  store.rerankModel = key as string;
                }}
                size="sm"
                className="w-full"
                label={t('rerank-model')}
                placeholder="cohere/rerank-english-v2.0"
              >
                {store.rerankModelSelect.list.map((item) => (
                  <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
                ))}
              </Autocomplete>
              <Button
                size="sm"
                color="primary"
                variant='light'
                isIconOnly
                onPress={() => store.fetchModels()}
              >
                <Icon className='hover:rotate-180 !transition-all' icon="fluent:arrow-sync-12-filled" width={18} height={18} />
              </Button>
            </div>
          }
        />

        {store.showRerankAdvancedSetting && store.rerankModel && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <ItemWithTooltip
                content={<>{t('use-embedding-endpoint')}</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('use-custom-rerank-endpoint-description')}</div>
                  </div>
                }
              />
            }
            rightContent={
              <Switch
                size="sm"
                isSelected={store.rerankUseEembbingEndpoint}
                onChange={(e) => {
                  store.rerankUseEembbingEndpoint = e.target.checked;
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'rerankUseEembbingEndpoint',
                      value: e.target.checked,
                    }),
                    { autoAlert: false },
                  );
                }}
              />
            }
          />
        )}

        {store.showRerankAdvancedSetting && store.rerankModel && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={<>{t('rerank')} Top K</>
            }
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start">
                <Slider
                  onChangeEnd={(e) => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'rerankTopK',
                        value: store.rerankTopK,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  onChange={(e) => {
                    store.rerankTopK = Number(e);
                  }}
                  value={store.rerankTopK}
                  size="md"
                  step={1}
                  color="foreground"
                  label={'value'}
                  showSteps={false}
                  maxValue={20}
                  minValue={1}
                  defaultValue={2}
                  className="w-full"
                />
              </div>
            }
          />
        )}

        {store.showRerankAdvancedSetting && store.rerankModel && (
          <Item
            className="ml-6"
            type={isPc ? 'row' : 'col'}
            leftContent={
              <ItemWithTooltip
                content={<>{t('rerank')} Score</>}
                toolTipContent={
                  <div className="md:w-[300px] flex flex-col gap-2">
                    <div>{t('rerank-score-description')}</div>
                  </div>
                }
              />
            }
            rightContent={
              <div className="flex md:w-[300px] w-full ml-auto justify-start">
                <Slider
                  onChangeEnd={(e) => {
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'rerankScore',
                        value: store.rerankScore,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  onChange={(e) => {
                    store.rerankScore = Number(e);
                  }}
                  value={store.rerankScore}
                  size="md"
                  step={0.01}
                  color="foreground"
                  label={'value'}
                  showSteps={false}
                  maxValue={1.0}
                  minValue={0.2}
                  defaultValue={0.75}
                  className="w-full"
                />
              </div>
            }
          />
        )}


      </CollapsibleCard>


      <CollapsibleCard className="mt-4" icon="tabler:robot" title={t('ai-post-processing')}>
        <Item
          leftContent={
            <ItemWithTooltip
              content={<>{t('enable-ai-post-processing')}</>}
              toolTipContent={
                <div className="w-[300px] flex flex-col gap-2">
                  <div>
                    {t('automatically-process-notes-after-creation-or-update')}
                  </div>
                  <div>
                    {t('can-generate-summaries-tags-or-perform-analysis')}
                  </div>
                </div>
              }
            />
          }
          rightContent={
            <Switch
              isSelected={blinko.config.value?.isUseAiPostProcessing}
              onChange={(e) => {
                PromiseCall(
                  api.config.update.mutate({
                    key: 'isUseAiPostProcessing',
                    value: e.target.checked,
                  }),
                  { autoAlert: false },
                );
              }}
            />
          }
        />

        {blinko.config.value?.isUseAiPostProcessing && (
          <>
            {blinko.config.value?.aiPostProcessingMode === 'comment' && (
              <Item
                type={isPc ? 'row' : 'col'}
                leftContent={
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {t('ai-post-processing-prompt')}
                      <Tooltip
                        content={
                          <div className="w-[300px] flex flex-col gap-2">
                            <div>{t('define-custom-prompt-for-ai-to-process-notes')}</div>
                          </div>
                        }
                      >
                        <Icon icon="proicons:info" width="18" height="18" />
                      </Tooltip>
                    </div>
                    <div className="text-[12px] text-default-400">{t('prompt-used-for-post-processing-notes')}</div>
                  </div>
                }
                rightContent={
                  <Textarea
                    radius="lg"
                    value={store.aiCommentPrompt ?? t('analyze-the-following-note-content-and-suggest-appropriate-tags-and-provide-a-brief-summary')}
                    onBlur={(e) => {
                      PromiseCall(
                        api.config.update.mutate({
                          key: 'aiCommentPrompt',
                          value: e.target.value,
                        }),
                        { autoAlert: false },
                      );
                    }}
                    onChange={(e) => {
                      store.aiCommentPrompt = e.target.value;
                    }}
                    placeholder={t('enter-custom-prompt-for-post-processing')}
                    className="w-full"
                  />
                }
              />
            )}

            {blinko.config.value?.aiPostProcessingMode === 'tags' && (
              <Item
                type={isPc ? 'row' : 'col'}
                leftContent={
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {t('tags-prompt')}
                    </div>
                    <div className="text-[12px] text-default-400">{t('greater-than-prompt-used-for-auto-generating-tags-if-set-empty-the-default-prompt-will-be-used')}</div>
                  </div>
                }
                rightContent={
                  <Textarea
                    radius="lg"
                    value={store.aiTagsPrompt || `You are a precise label classification expert, and you will generate precisely matched content labels based on the content. Rules:
      1. **Core Selection Principle**: Select 5 to 8 tags from the existing tag list that are most relevant to the content theme. Carefully compare the key information, technical types, application scenarios, and other elements of the content to ensure that the selected tags accurately reflect the main idea of the content.
      2. **Language Matching Strategy**: If the language of the existing tags does not match the language of the content, give priority to using the language of the existing tags to maintain the consistency of the language style of the tag system.
      3. **Tag Structure Requirements**: When using existing tags, it is necessary to construct a parent-child hierarchical structure. For example, place programming language tags under parent tags such as #Code or #Programming, like #Code/JavaScript, #Programming/Python. When adding new tags, try to classify them under appropriate existing parent tags as well.
      4. **New Tag Generation Rules**: If there are no tags in the existing list that match the content, create new tags based on the key technologies, business fields, functional features, etc. of the content. The language of the new tags should be consistent with that of the content.
      5. **Response Format Specification**: Only return tags separated by commas. There should be no spaces between tags, and no formatting or code blocks should be used. Each tag should start with #, such as #JavaScript.
      6. **Example**: For JavaScript content related to web development, a reference response could be #Programming/Languages, #Web/Development, #Code/JavaScript, #Front-End Development/Frameworks (if applicable), #Browser Compatibility. It is strictly prohibited to respond in formats such as code blocks, JSON, or Markdown. Just provide the tags directly. 
         `}
                    onBlur={(e) => {
                      PromiseCall(
                        api.config.update.mutate({
                          key: 'aiTagsPrompt',
                          value: e.target.value,
                        }),
                        { autoAlert: false },
                      );
                    }}
                    onChange={(e) => {
                      store.aiTagsPrompt = e.target.value;
                    }}
                    placeholder="Enter custom prompt for auto-generating tags"
                    className="w-full md:w-[400px]"
                  />
                }
              />
            )}

            {blinko.config.value?.aiPostProcessingMode === 'smartEdit' && (
              <Item
                type={isPc ? 'row' : 'col'}
                leftContent={
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {t('smart-edit-prompt')}
                      <Tooltip
                        content={
                          <div className="w-[300px] flex flex-col gap-2">
                            <div>{t('define-instructions-for-ai-to-edit-your-notes')}</div>
                          </div>
                        }
                      >
                        <Icon icon="proicons:info" width="18" height="18" />
                      </Tooltip>
                    </div>
                    <div><Chip size="sm" color="warning" className="ml-2">{t('function-call-required')}</Chip></div>
                  </div>
                }
                rightContent={
                  <Textarea
                    radius="lg"
                    value={store?.aiSmartEditPrompt}
                    onBlur={(e) => {
                      PromiseCall(
                        api.config.update.mutate({
                          key: 'aiSmartEditPrompt',
                          value: e.target.value,
                        }),
                        { autoAlert: false },
                      );
                    }}
                    onChange={(e) => {
                      if (!store.aiSmartEditPrompt) {
                        store.aiSmartEditPrompt = e.target.value;
                      } else {
                        store.aiSmartEditPrompt = e.target.value;
                      }
                    }}
                    className="w-full"
                  />
                }
              />
            )}

            {blinko.config.value?.aiPostProcessingMode === 'both' && (
              <>
                <Item
                  type={isPc ? 'row' : 'col'}
                  leftContent={
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {t('ai-post-processing-prompt')}
                        <Tooltip
                          content={
                            <div className="w-[300px] flex flex-col gap-2">
                              <div>{t('define-custom-prompt-for-ai-to-process-notes')}</div>
                            </div>
                          }
                        >
                          <Icon icon="proicons:info" width="18" height="18" />
                        </Tooltip>
                      </div>
                      <div className="text-[12px] text-default-400">{t('prompt-used-for-post-processing-notes')}</div>
                    </div>
                  }
                  rightContent={
                    <Textarea
                      radius="lg"
                      value={store.aiCommentPrompt ?? t('analyze-the-following-note-content-and-suggest-appropriate-tags-and-provide-a-brief-summary')}
                      onBlur={(e) => {
                        PromiseCall(
                          api.config.update.mutate({
                            key: 'aiCommentPrompt',
                            value: e.target.value,
                          }),
                          { autoAlert: false },
                        );
                      }}
                      onChange={(e) => {
                        store.aiCommentPrompt = e.target.value;
                      }}
                      placeholder={t('enter-custom-prompt-for-post-processing')}
                      className="w-full"
                    />
                  }
                />
                <Item
                  type={isPc ? 'row' : 'col'}
                  leftContent={
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        Tags Prompt
                        <Tooltip
                          content={
                            <div className="w-[300px] flex flex-col gap-2">
                              <div>Define custom prompt for AI to generate tags</div>
                            </div>
                          }
                        >
                          <Icon icon="proicons:info" width="18" height="18" />
                        </Tooltip>
                      </div>
                      <div className="text-[12px] text-default-400">Prompt used for auto-generating tags</div>
                    </div>
                  }
                  rightContent={
                    <Textarea
                      radius="lg"
                      value={store.aiTagsPrompt ?? 'Analyze the following note content and suggest appropriate tags for classification. Return tags in format: tag1, tag2, tag3'}
                      onBlur={(e) => {
                        PromiseCall(
                          api.config.update.mutate({
                            key: 'aiTagsPrompt',
                            value: e.target.value,
                          }),
                          { autoAlert: false },
                        );
                      }}
                      onChange={(e) => {
                        store.aiTagsPrompt = e.target.value;
                      }}
                      placeholder="Enter custom prompt for auto-generating tags"
                      className="w-full"
                    />
                  }
                />
              </>
            )}

            <Item
              type={isPc ? 'row' : 'col'}
              leftContent={
                <div className="flex flex-col gap-1">
                  <div>{t('ai-post-processing-mode')}</div>
                  <div className="text-[12px] text-default-400">{t('choose-what-to-do-with-ai-results')}</div>
                </div>
              }
              rightContent={
                <Select
                  radius="lg"
                  selectedKeys={[blinko.config.value?.aiPostProcessingMode ?? 'comment']}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0] as string;
                    PromiseCall(
                      api.config.update.mutate({
                        key: 'aiPostProcessingMode',
                        value: value,
                      }),
                      { autoAlert: false },
                    );
                  }}
                  size="sm"
                  className="w-[200px]"
                >
                  <SelectItem key="comment" startContent={<Icon icon="tabler:message" />}>
                    {t('add-as-comment')}
                  </SelectItem>
                  <SelectItem key="tags" startContent={<Icon icon="tabler:tags" />}>
                    {t('auto-add-tags')}
                  </SelectItem>
                  <SelectItem key="smartEdit" startContent={<Icon icon="tabler:robot" />}>
                    {t('smart-edit')}

                  </SelectItem>
                  <SelectItem key="both" startContent={<Icon icon="tabler:analyze" />}>
                    {t('both')}
                  </SelectItem>
                </Select>
              }
            />
          </>
        )}
      </CollapsibleCard>

      <CollapsibleCard icon="hugeicons:ai-chemistry-02" title={t('ai-tools')} className="mt-4">
        <Item
          leftContent={<>{t('tavily-api-key')}</>}
          rightContent={
            <Input
              size="sm"
              label="API key"
              variant="bordered"
              className="w-full md:w-[300px]"
              value={store.tavilyApiKey}
              onChange={(e) => {
                store.tavilyApiKey = e.target.value;
              }}
              onBlur={(e) => {
                PromiseCall(
                  api.config.update.mutate({
                    key: 'tavilyApiKey',
                    value: store.tavilyApiKey,
                  }),
                  { autoAlert: false },
                );
              }}
            />
          }
        />

        <Item
          leftContent={
            <div className="flex flex-col gap-1">
              <>{t('tavily-max-results')}</>
            </div>
          }
          rightContent={
            <div className="flex md:w-[300px] w-full ml-auto justify-start">
              <Slider
                onBlur={(e) => {
                  PromiseCall(
                    api.config.update.mutate({
                      key: 'tavilyMaxResult',
                      value: store.tavilyMaxResult,
                    }),
                    { autoAlert: false },
                  );
                }}
                onChange={(e) => {
                  store.tavilyMaxResult = Number(e);
                }}
                value={Number(store.tavilyMaxResult)}
                size="md"
                step={1}
                color="foreground"
                label={'value'}
                showSteps={true}
                maxValue={10}
                minValue={1}
                defaultValue={5}
                className="w-full"
              />
            </div>
          }
        />
      </CollapsibleCard>
    </>
  );
});
