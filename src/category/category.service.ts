import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { ProductService } from '../product/product.service';
import { ReturnCategory } from './dtos/return-category.dto';
import { CountProduct } from '../product/dtos/count-product.dto';
import { UpdateCategory } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

        @Inject(forwardRef((() => ProductService)))
        private readonly productService: ProductService
    ) {}
    findAmountCategoryInProducts(category: CategoryEntity, countList: CountProduct[]): number {
        const count = countList.find((itemCount) => itemCount.category_id === category.id);

        if (count) {
            return count.total;
        }

        return 0;
    }
    async findAllCategories(): Promise<ReturnCategory[]> {
        const categories = await this.categoryRepository.find();

        const count = await this.productService.countProductsByCategory();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return categories.map((category) => new ReturnCategory(category, this.findAmountCategoryInProducts(category, count)));
    }

    async findCategoryById(categoryId: number, isRelations?: boolean): Promise<CategoryEntity> {
        const relations = isRelations ? {
            products: true,
        } : undefined

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }, relations
        })

        if (!category) {
            throw new NotFoundException(`Id da categoria: '${categoryId}' não foi encontrado`)
        }

        return category;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name
            }
        });

        if (!category) {
            throw new NotFoundException(`Nome da categoria '${name}' não encontrado`)
        }

        return category;
    }

    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategory.name).catch(() => (undefined));

        if (category) {
            throw new BadRequestException(`Nome da categoria '${createCategory.name}' já existe`)
        }

        return this.categoryRepository.save(createCategory);
    }

    async deleteCategory(categoryId: number): Promise<DeleteResult> {
        const category = await this.findCategoryById(categoryId, true);
        
        if (category.products?.length > 0) {
            throw new BadRequestException('Categoria com produtos')
        }
        return this.categoryRepository.delete({ id: categoryId })
    }

    async editCategory(categoryId: number, updateCategory: UpdateCategory ): Promise<CategoryEntity> {
        const category = await this.findCategoryById(categoryId);

        return this.categoryRepository.save({
            ...category,
            ...updateCategory,
        })
    }
}
