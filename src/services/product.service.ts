
import { Repository, getManager } from "typeorm";


export class ProductService {


    userRepository: Repository<ProductDetail>;

    
    constructor() {
    this.userRepository = getManager().getRepository(ProductDetail);
    }
    //create new product

    instantiate(data: Object): ProductDetail | undefined {
        return this.userRepository.create(data);
      }

     // Inserts a new product into the database.
   
  async insert(data: ProductDetail): Promise<ProductDetail> {
    const newProduct = this.userRepository.create(data);
    return await this.userRepository.save(newProduct);
  }

 // Returns array of all product from db
   
  async getAll(): Promise<ProductDetail[]> {
    return await this.userRepository.find();
  }

  /**
   * Returns a product by given id
   */
  async getById(id: string | number): Promise<ProductDetail> {
    
    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Updates a user
   */
  async update(ProductDetail: ProductDetail): Promise<ProductDetail | undefined> {
    try {
      const updatedProduct = await this.userRepository.save(ProductDetail);
      return updatedProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

