import ConfidenceBadge from '@/components/badges/ConfidenceBadge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  useChatbotSettings,
  useChatbotSettingsMutations,
} from './hooks/useChatbotSettings'
import { Activity } from 'lucide-react'
import ChatbotSettingsLogsDialog from './components/ChatbotSettingsLogsDialog'

const SETTING_KEYS = ['high_threshold', 'medium_threshold', 'low_threshold']

const ChatbotSettingsPage = () => {
  const [logsDialogOpen, setLogsDialogOpen] = useState(false)

  useMeta({
    title: `Chatbot Settings | Admin | ${APP_NAME}`,
    description: `Manage chatbot confidence thresholds in the ${APP_NAME} admin portal.`,
  })

  const { data: settings, isLoading, error } = useChatbotSettings()
  const { update, isUpdating } = useChatbotSettingsMutations()

  const [localValues, setLocalValues] = useState({})

  useEffect(() => {
    if (settings) {
      const initial = {}
      SETTING_KEYS.forEach((key) => {
        initial[key] = settings[key]?.value ?? ''
      })
      setLocalValues(initial)
    }
  }, [settings])

  const handleChange = (key, value) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async (key) => {
    const newValue = parseFloat(localValues[key])
    const oldValue = settings[key]?.value

    if (isNaN(newValue) || newValue < 0 || newValue > 1) {
      toast.error('Value must be a number between 0 and 1')
      return
    }

    if (newValue === oldValue) {
      toast.info('No changes to save')
      return
    }

    try {
      await update({ key, oldValue, newValue })
      toast.success(`${settings[key]?.label ?? key} updated successfully`)
    } catch (err) {
      toast.error(err.message || 'Failed to update setting')
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center p-6'>
        <span className='text-muted-foreground text-sm'>
          Loading settings...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-6'>
        <p className='text-destructive text-sm'>{error.message}</p>
      </div>
    )
  }

  const highThreshold = settings?.high_threshold?.value ?? 0.55
  const lowThreshold = settings?.medium_threshold?.value ?? 0.35

  return (
    <div className='min-w-full space-y-6 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>Chatbot Settings</h2>
          <p className='text-muted-foreground'>
            Adjust confidence thresholds for chatbot responses.
          </p>
        </div>
        <Button variant='outline' onClick={() => setLogsDialogOpen(true)}>
          <Activity />
          Logs
        </Button>
      </div>

      <div className='rounded-md border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='text-muted-foreground px-4 py-3 text-left font-medium'>
                Setting
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left font-medium'>
                Current Value
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left font-medium'>
                New Value
              </th>
              <th className='px-4 py-3' />
            </tr>
          </thead>
          <tbody>
            {SETTING_KEYS.map((key, i) => {
              const setting = settings?.[key]
              const currentValue = setting?.value ?? 0
              const previewValue = parseFloat(localValues[key]) || 0

              return (
                <tr key={key} className={i % 2 === 0 ? 'bg-muted' : 'bg-card'}>
                  <td className='px-4 py-3 font-medium'>
                    {setting?.label ?? key}
                  </td>
                  <td className='px-4 py-3'>
                    <ConfidenceBadge
                      confidence={currentValue}
                      highThreshold={highThreshold}
                      lowThreshold={lowThreshold}
                    />
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Input
                        type='number'
                        min={0}
                        max={1}
                        step={0.01}
                        value={localValues[key] ?? ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className='w-28'
                      />
                      <ConfidenceBadge
                        confidence={previewValue}
                        highThreshold={highThreshold}
                        lowThreshold={lowThreshold}
                      />
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <Button
                      size='sm'
                      onClick={() => handleSave(key)}
                      disabled={isUpdating}
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <ChatbotSettingsLogsDialog
          open={logsDialogOpen}
          onOpenChange={setLogsDialogOpen}
          highThreshold={highThreshold}
          lowThreshold={lowThreshold}
        />
      </div>
    </div>
  )
}

export default ChatbotSettingsPage
