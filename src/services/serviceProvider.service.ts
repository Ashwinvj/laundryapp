import { ServiceProvider } from "../entities/serviceProvider.entity";
import { Repository, getManager } from "typeorm";
import { Logger,ILogger } from "../utils/logger";



export class ServiceProviderService {


    userRepository: Repository<ServiceProvider>;
    logger: ILogger;

    constructor() {
        this.logger = new Logger(__filename);
        this.userRepository = getManager().getRepository(ServiceProvider);
      }
    

      /**
   * Creates an instance of ServiceProvider.
   */
  instantiate(data: ServiceProvider): ServiceProvider | undefined {
    return this.userRepository.create(data);
  }

      /**
   * inserts an instance of ServiceProvider.
   */
  async insert(data: ServiceProvider): Promise<ServiceProvider> {
    this.logger.info('Create a new serviceProvider', data);
    const newServiceProvider = this.userRepository.create(data);
    return await this.userRepository.save(newServiceProvider);
  }

  /**
   * Returns array of all serviceProvider from db
   */
  async getAll(): Promise<ServiceProvider[]> {
    return await this.userRepository.find();
  }

  /**
   * Returns a serviceProvider by given id
   */
  async getById(id: string | number): Promise<ServiceProvider> {
    this.logger.info('Fetching user by id: ', id);
    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a serviceProvider by email
   */
  async getByEmail(email: string): Promise<ServiceProvider | undefined> {
    const serviceProvider = await this.userRepository.find({
      where: {
        email: email
      }
    });
    if (serviceProvider && serviceProvider.length > 0) {
      return serviceProvider[0];  // typeorm find() returns array even if response is single object
    } else {
      return undefined;
    }
  }

  /**
   * Updates a user
   */
  async update(user:ServiceProvider): Promise<ServiceProvider | undefined> {
    try {
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
    

    






