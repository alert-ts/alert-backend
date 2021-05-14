import { NestFactory, NestApplication } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

import { AppModule } from "./modules/app.module";

class App {
	public static async bootstrap(
		port: number = 1939,
		docsPath = "api",
	): Promise<void> {
		const app: NestApplication = await NestFactory.create(AppModule);

		const swaggerConfig: any = new DocumentBuilder()
			.setTitle("Alert API")
			.setDescription("")
			.setVersion("1.0")
			.build();

		const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
			app,
			swaggerConfig,
		);
		SwaggerModule.setup(docsPath, app, swaggerDocument);

		await app.listen(port, (): void =>
			console.log(
				"Running on port:",
				port,
				`API docs on: http://localhost:${port}/${docsPath}`,
			),
		);
	}
}

App.bootstrap();
