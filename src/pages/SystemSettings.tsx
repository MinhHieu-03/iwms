
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Database, Server, Globe, HardDrive } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SystemSettings = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('system_settings')}</h2>
        <div className="space-x-2">
          <Button variant="outline">{t('reset')}</Button>
          <Button>{t('save_changes')}</Button>
        </div>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            {t('database_configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="database-url">{t('database_url')}</Label>
            <Input id="database-url" value="postgres://user:password@localhost:5432/warehouse" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="connection-pool">{t('connection_pool')}</Label>
            <Input id="connection-pool" type="number" defaultValue="10" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">{t('query_timeout')}</Label>
            <Input id="timeout" type="number" defaultValue="30" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="mr-2 h-5 w-5" />
            {t('server_settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="port">{t('server_port')}</Label>
            <Input id="port" type="number" defaultValue="8080" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">{t('environment')}</Label>
            <Select defaultValue="production">
              <SelectTrigger id="environment">
                <SelectValue placeholder={t('environment')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">{t('development')}</SelectItem>
                <SelectItem value="staging">{t('staging')}</SelectItem>
                <SelectItem value="production">{t('production')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="log-level">{t('log_level')}</Label>
            <Select defaultValue="info">
              <SelectTrigger id="log-level">
                <SelectValue placeholder={t('log_level')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">{t('debug')}</SelectItem>
                <SelectItem value="info">{t('info')}</SelectItem>
                <SelectItem value="warn">{t('warning')}</SelectItem>
                <SelectItem value="error">{t('error')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="mr-2 h-5 w-5" />
            {t('storage_configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storage-path">{t('storage_path')}</Label>
            <Input id="storage-path" defaultValue="/var/data/warehouse" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-enabled">{t('automatic_backups')}</Label>
            <Select defaultValue="enabled">
              <SelectTrigger id="backup-enabled">
                <SelectValue placeholder={t('automatic_backups')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">{t('enabled')}</SelectItem>
                <SelectItem value="disabled">{t('disabled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-frequency">{t('backup_frequency')}</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="backup-frequency">
                <SelectValue placeholder={t('backup_frequency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">{t('hourly')}</SelectItem>
                <SelectItem value="daily">{t('daily')}</SelectItem>
                <SelectItem value="weekly">{t('weekly')}</SelectItem>
                <SelectItem value="monthly">{t('monthly')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            {t('api_configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">{t('api_key')}</Label>
            <div className="flex space-x-2">
              <Input id="api-key" type="password" value="87x92jd8s7f6g5h4j3k2" />
              <Button variant="outline">{t('regenerate')}</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate-limit">{t('rate_limit')}</Label>
            <Input id="rate-limit" type="number" defaultValue="100" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
