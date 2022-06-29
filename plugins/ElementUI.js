import Vue from 'vue'
import('~/assets/css/element-index.scss')

import ElSkeleton from '~/node_modules/element-ui/lib/skeleton'
import ElSkeletonItem from '~/node_modules/element-ui/lib/skeleton-item'

Vue.component(ElSkeletonItem.name, ElSkeletonItem)
Vue.component(ElSkeleton.name, ElSkeleton)
