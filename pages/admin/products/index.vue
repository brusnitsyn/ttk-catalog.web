<template>
  <Loading v-if="$fetchState.pending" />
  <el-container v-else direction="vertical" class="pt-6 px-4">
    <div class="flex items-center flex-row justify-between">
      <el-page-header @back="$router.go(-1)" class="text-2xl font-semibold" title="Назад" content="Все товары" />
      <el-button type="primary" @click="drawer = true">
        Добавить товар
      </el-button>
    </div>
    <el-table ref="multipleTable" :data="products" class="w-full" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="Наименование" width="200" />
      <el-table-column property="article" label="Артикул" width="120" />
      <el-table-column property="actualPrice" label="Стоимость" width="120" />
      <el-table-column label="Действия" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">Редактировать</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-2 mb-2">
      <el-pagination v-if="pagination.lastPage > 1" :page-size.sync="pagination.perPage" background
        :pager-count="pagination.perPage" @prev-click="paginationPrevClick" @next-click="paginationNextClick"
        @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
      </el-pagination>
    </div>
    <el-drawer title="Добавить товар" :visible.sync="drawer" :direction="rtl" custom-class="w-full lg:w-1/3" size="">
      <el-form ref="createForm" :model="form" :rules="rules" class="px-5" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input type="text" v-model="form.name" />
        </el-form-item>
        <el-form-item label="Артикул" prop="article">
          <el-input type="text" v-model="form.article" />
        </el-form-item>
        <el-form-item label="Производитель" prop="brandId">
          <el-select v-model="form.brandId" filterable class="w-full" @change="selectBrand" no-data-text="Нет данных"
            no-match-text="Производитель не найден" placeholder="Выберите производителя">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Тип техники" prop="typeId">
          <el-select v-model="form.typeId" :disabled="!(form.brandId != null)" filterable @change="selectMachineType"
            class="w-full" no-data-text="Нет данных" no-match-text="Тип техники не найден"
            placeholder="Выберите тип техники">
            <el-option v-for="item in machineTypesForBrand" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Техника" prop="machines">
          <el-select v-model="form.machines" :disabled="!(form.typeId != null)" filterable class="w-full" multiple
            value-key="id" no-data-text="Нет данных" no-match-text="Техника не найдена" placeholder="Выберите технику">
            <el-option v-for="item in machines" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Категория" prop="categoryId">
          <el-select v-model="form.categoryId" filterable class="w-full" no-data-text="Нет данных"
            no-match-text="Категории не найдены" placeholder="Выберите категорию">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Цена" prop="actualPrice">
          <el-input v-model="form.actualPrice" type="number" class="w-full" placeholder="Введите цену" />
        </el-form-item>
        <el-form-item label="Цена распродажи" prop="discountPrice">
          <el-input v-model="form.discountPrice" :disabled="!(form.categoryId == 3)" type="number" class="w-full"
            placeholder="Введите цену распродажи" />
        </el-form-item>
        <el-form-item label="Описание" prop="description">
          <el-input type="textarea" :rows="3" placeholder="Данное поле не обязательное" v-model="form.description" />
        </el-form-item>
        <el-form-item label="Свойства">
          <!-- <div class="flex justify-between items-center">
              <h2>Свойства</h2>
              <el-button type="text" @click="dialogPropertiesShow = !dialogPropertiesShow">
                Добавить свойство
              </el-button>
            </div> -->
          <ol v-if="form.properties">
            <li v-for="prop in form.properties" :key="prop.id">
              <el-input :placeholder="Значение" v-model="prop.value">
                <el-select v-model="prop.property" slot="prepend" value-key="id" no-data-text="Нет данных"
                  no-match-text="Нет подходящих свойств" placeholder="Свойство" filterable class="lg:w-[140px]">
                  <el-option v-for="item in properties" :key="item.id" :label="item.name" :value="item" />
                </el-select>
                <!-- <el-input slot="append"></el-input> -->
              </el-input>
              <div class="flex justify-end">
                <el-checkbox v-model="productProperty.isDimension">
                  Единица измерения?
                </el-checkbox>
                <el-input :disabled="!productProperty.isDimension" v-model="productProperty.dimension"
                  placeholder="Единица измерения"></el-input>
              </div>
            </li>
          </ol>
          <ol v-else>
            <li v-for="prop in form.properties" :key="prop.id">
              <el-input :placeholder="Значение" v-model="prop.value">
                <el-select v-model="prop.property" slot="prepend" value-key="id" no-data-text="Нет данных"
                  no-match-text="Нет подходящих свойств" placeholder="Свойство" filterable class="lg:w-[140px]">
                  <el-option v-for="item in properties" :key="item.id" :label="item.name" :value="item" />
                </el-select>
                <!-- <el-input slot="append"></el-input> -->
              </el-input>
              <div class="flex justify-items-end">
                <el-checkbox v-model="productProperty.isDimension">
                  Единица измерения?
                </el-checkbox>
                <el-input :disabled="!productProperty.isDimension" v-model="productProperty.dimension"
                  placeholder="Единица измерения"></el-input>
              </div>
            </li>
          </ol>

          <el-button type="primary" icon="el-icon-plus" class="w-1/2" @click="form.properties.push({})">Добавить
            свойство</el-button>
          <!-- <ol v-if="product.properties.length" class="pt-2 space-y-0.5">
              <li v-for="prop in product.properties" :key="prop.id">
                <div class="flex flex-row justify-between">
                  <span class="font-inter text-sm">{{ prop.property.name }}</span>
                  <div class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"></div>
                  <div class="flex gap-x-1">
                    <span class="font-inter text-sm font-semibold">
                      {{ prop.value }}
                    </span>
                    <span v-if="prop.isDimension" class="font-inter text-sm font-semibold">
                      {{ prop.dimension }}
                    </span>
                    <el-link type="danger" @click="handleRemoveProperty(prop)">
                      Удалить
                    </el-link>
                  </div>
                </div>
              </li>
            </ol> -->
        </el-form-item>
        <el-form-item label="Изображения">
          <el-upload action=" " name="images" ref="uploaderProductImages" class="mb-3" list-type="picture-card"
            :on-change="onChangeUploaderProductImages" :multiple="true" :auto-upload="false" :file-list="form.images">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemoveProductImage(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item class="pt-3">
          <el-button type="primary" @click="submitForm('createForm')">Добавить</el-button>
          <el-button @click="resetForm('createForm')">Сбросить</el-button>
        </el-form-item>
      </el-form>

      <!-- Brand dialog -->
      <el-dialog title="Добавить производителя" :visible.sync="dialogBrandVisible" width="80%">
        <el-form :model="brand" ref="dialogCreateBrand" label-position="top">
          <el-form-item label="Наименование" prop="name">
            <el-input v-model="brand.name" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogBrandVisible = false">Отмена</el-button>
          <el-button type="primary" @click="createBrand"> Добавить </el-button>
        </span>
      </el-dialog>

      <!-- Create prop dialog -->
      <el-dialog title="Создать свойство" :visible.sync="dialogCreatePropVisible" width="80%">
        <el-form :model="property" ref="dialogCreateProp" label-position="top">
          <el-form-item label="Наименование" prop="name">
            <el-input v-model="property.name" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCreatePropVisible = false">Отмена</el-button>
          <el-button type="primary" @click="createProperty"> Добавить </el-button>
        </span>
      </el-dialog>

      <!-- Machine type dialog -->
      <el-dialog title="Создать тип техники" :visible.sync="dialogMachineTypeVisible" width="80%">
        <el-form :model="machineType" ref="dialogCreateMachineType" label-position="top">
          <el-form-item label="Наименование" prop="name">
            <el-input v-model="machineType.name" />
          </el-form-item>
          <el-form-item label="Производитель" prop="brand">
            <el-select v-model="machineType.brandId" filterable class="w-full" no-data-text="Нет данных"
              no-match-text="Тип техники не найден" placeholder="Выберите тип техники">
              <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogMachineTypeVisible = false">Отмена</el-button>
          <el-button type="primary" @click="createMachineType">
            Добавить
          </el-button>
        </span>
      </el-dialog>

      <!-- Machine dialog -->
      <el-dialog title="Создать технику" :visible.sync="dialogMachineVisible" width="80%">
        <el-form :model="machine" ref="dialogCreateMachine" label-position="top">
          <el-form-item label="Наименование" prop="name">
            <el-input v-model="machine.name" />
          </el-form-item>
          <el-form-item label="Производитель" prop="brand">
            <el-select v-model="machine.brandId" filterable class="w-full" @change="selectBrandChange"
              no-data-text="Нет данных" no-match-text="Производитель не найден" placeholder="Выберите производителя">
              <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Тип" prop="type">
            <el-select v-model="machine.typeId" filterable class="w-full" no-data-text="Нет данных"
              no-match-text="Тип техники не найден" placeholder="Выберите тип техники"
              :disabled="!(dialogMachineTypesForBrand.length > 0)">
              <el-option v-for="item in dialogMachineTypesForBrand" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogMachineVisible = false">Отмена</el-button>
          <el-button type="primary" @click="createMachine"> Добавить </el-button>
        </span>
      </el-dialog>

      <!-- Props dialog -->
      <el-dialog title="Добавить свойство" :visible.sync="dialogPropertiesShow" append-to-body width="80%">
        <el-form :model="productProperty" ref="dialogProperties" label-position="top">
          <el-form-item label="Свойство" prop="property">
            <el-select v-model="productProperty.property" filterable class="w-full" value-key="id"
              no-data-text="Нет данных" no-match-text="Нет подходящих свойств" placeholder="Выберите свойство">
              <el-option v-for="item in properties" :key="item.id" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Значение" prop="value">
            <el-input placeholder="Значение" v-model="productProperty.value"></el-input>
          </el-form-item>
          <el-form-item label="Дополнительно">
            <el-form :inline="true">
              <el-form-item>
                <el-checkbox v-model="productProperty.isDimension">
                  Единица измерения?
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-input :disabled="!productProperty.isDimension" v-model="productProperty.dimension"
                  placeholder="Единица измерения"></el-input>
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogPropertiesShow = !dialogPropertiesShow">
            Отмена
          </el-button>
          <el-button type="primary" @click="addProductProperty">
            Добавить
          </el-button>
        </span>
      </el-dialog>
    </el-drawer>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    form() {
      return Object.assign({}, this.product)
    },
    ...mapGetters({
      products: 'products/getProducts',
      pagination: 'products/getPagination',

      product: 'products/getProduct',
      brands: 'brands/getBrands',
      machineTypes: 'machineTypes/getMachineTypes',
      machines: 'machines/getMachines',
      categories: 'products/getCategories',
      properties: 'api/products/properties/getProperties',
    }),
  },
  data() {
    return {
      drawer: false,
      selectedMachineType: null,
      dialogPropertiesShow: false,
      productProperty: {
        id: '',
        value: '',
        isDimension: false,
        dimension: '',
        property: {},
      },
      form: {
        images: [],
        machines: [],
        properties: [],
        categoryId: 1
      },
      machineTypesForBrand: [],
      brand: {
        name: ''
      },
      machineType: {
        name: ''
      },
      machine: {
        name: '',
      },
      property: {
        name: '',
      },
      dialogBrandVisible: false,
      dialogMachineTypeVisible: false,
      dialogCreatePropVisible: false,
      dialogMachineTypesForBrand: [],
      dialogMachineVisible: false,
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('Это действие удалит элемент без возможности восстановления. Продолжить?', 'Внимание', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('products/deleteSingleProduct', row)
        this.$message({
          type: 'success',
          message: `Элемент "${row.name}" был удален`
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        });
      });
    },
    handleEdit(product) {
      this.form = Object.assign({}, product)
    },

    paginationPrevClick() {
      this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.prev
      )
    },
    paginationNextClick() {
      this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.next
      )
    },
    paginationCurrentChange(page) {
      const params = { page: page }
      this.$store.dispatch('products/fetchProductsByFilter', params)
    },


    addProductProperty() {
      this.productProperty.id = this.product.properties.length
      this.productProperty.id++
      const property = Object.assign({}, this.productProperty)
      this.form.properties.push(property)
      this.$store.commit('products/pushProperty', property)
      this.dialogPropertiesShow = false
      this.$refs.dialogProperties.resetFields();
    },

    sendDataProductToUpload() {
      this.$store.dispatch('products/pushSingleProduct', this.form)
    },

    async selectBrand(brandId) {
      let params = { brand: brandId }
      let data = await this.$axios.get('/machines-types', { params })
      let result = await data
      this.machineTypesForBrand = result.data.data
    },

    selectMachineType(machineTypeId) {
      this.form.machines = []
      this.$store.dispatch(
        'machines/fetchSingleMachineForMachineType',
        machineTypeId
      )
    },

    handleRemoveProperty(property) {
      this.$store.commit('products/removeProperty', property)
    },
    handleRemoveProductImage(file) {
      let files = this.form.images
      this.form.images.forEach((img, index, obj) => {
        if (!img.raw) {
          if (img.uid === file.uid) {
            files.splice(index, 1)
          }

          return
        }
        if (img.raw.uid === file.raw.uid) {
          files.splice(index, 1)
        }
      })

      this.$refs.uploaderProductImages.fileList = files
    },
    onChangeUploaderProductImages(file, fileList) {
      this.form.images = []
      fileList.forEach((file) => {
        this.form.images.push(file)
      })
    },

    createBrand() {
      this.$store.dispatch('brands/postSingleBrand', this.brand)
      this.dialogBrandVisible = false
      this.$refs.dialogCreateBrand.resetFields();
    },
    createProperty() {
      this.$store.dispatch('api/products/properties/postSingleProperty', this.property)
      this.dialogCreatePropVisible = false
      this.$refs.dialogCreateProp.resetFields();
    },
    createMachineType() {
      this.$store.dispatch('machineTypes/postSingleMachineType', this.machineType)
      this.dialogMachineTypeVisible = false
      this.$refs.dialogCreateMachineType.resetFields();
    },
    createMachine() {
      this.$store.dispatch('machines/postSingleMachine', this.machine)
      this.dialogMachineVisible = false
      this.$refs.dialogCreateMachine.resetFields();
    },
    async selectBrandChange(brand) {
      let params = { brand: brand }
      let data = await this.$axios.get('/machines-types', { params })
      let result = await data
      this.dialogMachineTypesForBrand = result.data.data
    }

  },
  async fetch() {
    await this.$store.dispatch('products/fetchProductsByFilter')
  },
  mounted() {
    if (!this.products.length)
      this.$store.dispatch('products/fetchProductsByFilter')
    if (!this.brands.length)
      this.$store.dispatch('brands/fetchAllBrands')
    if (!this.machineTypes.length)
      this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    if (!this.categories.length)
      this.$store.dispatch('products/fetchAllCategories')
    if (!this.properties.length)
      this.$store.dispatch('api/products/properties/fetchAllProperties')
  },
}
</script>

<style>
</style>
