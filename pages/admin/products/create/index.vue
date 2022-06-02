<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4">
    <div class="flex flex-col md:flex-row justify-between">
      <h1 class="text-2xl font-semibold">Добавить товар</h1>
      <div class="py-2 md:py-0">
        <el-link @click="dialogBrandVisible = !dialogBrandVisible" type="primary" icon="el-icon-plus">
          Производитель</el-link>
        <el-link @click="dialogMachineTypeVisible = !dialogMachineTypeVisible" type="primary" icon="el-icon-plus">Тип
        </el-link>
        <el-link @click="dialogMachineVisible = !dialogMachineVisible" type="primary" icon="el-icon-plus">Техника
        </el-link>
        <el-link @click="dialogCreatePropVisible = !dialogCreatePropVisible" type="primary" icon="el-icon-plus">
          Свойство
        </el-link>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-2 pb-4">
      <div class="flex flex-col gap-y-2">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-y-2 md:gap-x-2">
          <div class="col-span-6 lg:col-span-3">
            <label class="text-sm">Наименование</label>
            <el-input placeholder="Крыло отвала" v-model="tempProduct.name" />
          </div>
          <div class="col-span-6 lg:col-span-3">
            <label class="text-sm">Артикул</label>
            <el-input placeholder="РЗЗ.65.01.002" v-model="tempProduct.article" />
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Производитель</label>
            <el-select v-model="tempProduct.brandId" filterable class="w-full" @change="selectBrand"
              no-data-text="Нет данных" no-match-text="Производитель не найден" placeholder="Выберите производителя">
              <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Тип техники</label>
            <el-select v-model="tempProduct.typeId" :disabled="!(tempProduct.brandId != null)" filterable
              @change="selectMachineType" class="w-full" no-data-text="Нет данных" no-match-text="Тип техники не найден"
              placeholder="Выберите тип техники">
              <el-option v-for="item in machineTypesForBrand" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Техника</label>
            <el-select v-model="tempProduct.machines" :disabled="!(tempProduct.typeId != null)" filterable
              class="w-full" multiple value-key="id" no-data-text="Нет данных" no-match-text="Техника не найдена"
              placeholder="Выберите технику">
              <el-option v-for="item in machines" :key="item.id" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Категория</label>
            <el-select v-model="tempProduct.categoryId" filterable class="w-full" no-data-text="Нет данных"
              no-match-text="Категории не найдены" placeholder="Выберите категорию">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Цена</label>
            <el-input v-model="tempProduct.actualPrice" type="number" class="w-full" placeholder="Введите цену">
            </el-input>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Цена распродажи</label>
            <el-input v-model="tempProduct.discountPrice" :disabled="!(tempProduct.categoryId == 3)" type="number"
              class="w-full" placeholder="Введите цену распродажи">
            </el-input>
          </div>
          <div class="col-span-6">
            <label class="text-sm">Описание</label>
            <el-input type="textarea" :rows="3" placeholder="Данное поле не обязательное"
              v-model="tempProduct.description">
            </el-input>
          </div>
        </div>
      </div>
      <div class="bg-white md:px-3 py-2 rounded-md">
        <div class="flex justify-between items-center">
          <h2>Свойства</h2>
          <el-button type="text" @click="dialogPropertiesShow = !dialogPropertiesShow">
            Добавить свойство
          </el-button>
        </div>
        <ol v-if="product.properties.length" class="pt-2 space-y-0.5">
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
        </ol>
        <h2 class="pt-3 pb-1">Изображения</h2>
        <el-upload action=" " name="images" ref="uploaderProductImages" class="mb-3" list-type="picture-card"
          :on-change="onChangeUploaderProductImages" :multiple="true" :auto-upload="false"
          :file-list="tempProduct.images">
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
      </div>
    </div>
    <el-button type="primary" @click="sendDataProductToUpload">
      Добавить
    </el-button>

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
    <el-dialog title="Добавить свойство" :visible.sync="dialogPropertiesShow" width="80%">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    tempProduct() {
      return Object.assign({}, this.product)
    },

    ...mapGetters({
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
      selectedMachineType: null,
      dialogPropertiesShow: false,
      productProperty: {
        value: '',
        isDimension: false,
        dimension: '',
        property: {},
      },
      tempProduct: {
        images: [],
        machines: [],
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
    addProductProperty() {
      this.$store.commit('products/pushProperty', this.productProperty)
      this.dialogPropertiesShow = false
      //this.$refs.dialogProperties.resetFields();
    },

    sendDataProductToUpload() {
      this.$store.dispatch('products/pushSingleProduct', this.tempProduct)
    },

    async selectBrand(brandId) {
      let params = { brand: brandId }
      let data = await this.$axios.get('/machines-types', { params })
      let result = await data
      this.machineTypesForBrand = result.data.data
    },

    selectMachineType(machineTypeId) {
      this.tempProduct.machines = []
      this.$store.dispatch(
        'machines/fetchSingleMachineForMachineType',
        machineTypeId
      )
    },

    handleRemoveProperty(property) {
      this.$store.commit('products/removeProperty', property)
    },
    handleRemoveProductImage(file) {
      let files = this.tempProduct.images
      this.tempProduct.images.forEach((img, index, obj) => {
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
      this.tempProduct.images = []
      fileList.forEach((file) => {
        this.tempProduct.images.push(file)
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
  mounted() {
    this.$store.dispatch('brands/fetchAllBrands')
    this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    this.$store.dispatch('products/fetchAllCategories')
    this.$store.dispatch('api/products/properties/fetchAllProperties')
    // this.$store.dispatch('machines/fetchAllMachines')
  },
}
</script>

<style>
</style>
