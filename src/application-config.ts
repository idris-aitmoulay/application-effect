import {Context, Effect, Layer} from 'effect'
import { Application } from 'express'

export class ApplicationConfig {
  private app: Application | null = null;

  public setApplication(app: Application) {
    this.app = app;
    return this;
  }

  public getApplication() {
    return this.app;
  }
}


export class ApplicationConfigContext extends Context.Tag("ApplicationConfigContext")<
  ApplicationConfigContext,
  {
    getApplication: () => Effect.Effect<Application | null>
  }
  >() {}

export const { getApplication } = Effect.serviceFunctions(ApplicationConfigContext)

type MakeApplicationConfigurationParams = {
  application: Application
}

export const layerFromApplicationConfigContext = ({ application }: MakeApplicationConfigurationParams) => {
  const applicationConfig = new ApplicationConfig()
    .setApplication(application);
  return Layer.succeed(ApplicationConfigContext)(
    ApplicationConfigContext.of({
      getApplication: () => Effect.succeed(applicationConfig.getApplication()),
    }),
  )
}




