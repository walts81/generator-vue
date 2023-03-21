<template>
  <div class="main-content container">
    <div class="row">
      <div class="text-input-example example col">
        Text Inputs
        <hr />
        <TextInput
          label="Text Input"
          v-model="text"
          large
          :rules="[v => (v === 'invalid-text' ? 'Invalid value' : true)]"
        />
        <TextInput label="Disabled Text Input" v-model="text" disabled floating-label />
        <TextInput label="Readonly Text Input" v-model="text" readonly floating-label />
        <TextInput type="number" v-model="text" prepend>
          <template v-slot:prepend>Prepend</template>
        </TextInput>
        <TextInput type="number" v-model="text" append>
          <template v-slot:append>Append</template>
        </TextInput>
        <TextInput v-model="text" prepend>
          <template v-slot:prepend>
            <RadioButton v-model="chk1" />
          </template>
        </TextInput>
        <TextInput v-model="text" append>
          <template v-slot:append>
            <Checkbox v-model="chk1" />
          </template>
        </TextInput>
      </div>
      <div class="auto-complete-example example col">
        <AutoComplete label="Autocomplete" v-model="autoCompleteText" :items="itemsToSelect" />
        <AutoComplete label="Disabled" v-model="autoCompleteText" :items="itemsToSelect" disabled floating-label />
        <AutoComplete label="Readonly" v-model="autoCompleteText" :items="itemsToSelect" readonly floating-label />
      </div>
      <div class="drop-down-example example col">
        Selects
        <hr />
        <DropDown label="Favorite Movie" v-model="selectedItem" :items="itemsToSelect" />
        <DropDown label="Disabled" v-model="selectedItem" :items="itemsToSelect" disabled />
        <DropDown label="Readonly" v-model="selectedItem" :items="itemsToSelect" readonly />
      </div>
      <div class="paginator-example example col">
        Pagination
        <hr />
        <ul class="list-group">
          <li
            v-for="(item, index) of paginatorOptions.pagedItems"
            class="list-group-item"
            :class="{ active: isSelected(item) }"
            :key="'paged_item_' + index.toString()"
          >
            {{ item.text }}
          </li>
        </ul>
        <Paginator v-model:options="paginatorOptions" />
      </div>
      <div class="radio-group-example example col">
        Radio Group
        <hr />
        <div class="model">Selected: {{ selectedItem?.text }}</div>
        <hr />
        <RadioGroup v-model="selectedItem" :items="smallList" />
      </div>
      <div class="checkbox-example example col">
        Checkboxes
        <hr />
        <div class="model">Check 1: {{ chk1 }}</div>
        <div class="model">Check 2: {{ chk2 }}</div>
        <hr />
        <Checkbox label="Check 1" v-model="chk1" />
        <Checkbox label="Check 2" v-model="chk2" />
      </div>
      <div class="radio-button-example example col">
        Radio Buttons
        <hr />
        <div class="model">Radio 1: {{ chk1 }}</div>
        <div class="model">Radio 2: {{ chk2 }}</div>
        <hr />
        <RadioButton label="Radio 1" v-model="chk1" />
        <RadioButton label="Radio 2" v-model="chk2" />
      </div>
      <div class="toggle-switch-example example col">
        Switches
        <hr />
        <div class="model">Toggle 1: {{ chk1 }}</div>
        <div class="model">Toggle 2: {{ chk2 }}</div>
        <hr />
        <ToggleSwitch label="Toggle 1" v-model="chk1" />
        <ToggleSwitch label="Toggle 2" v-model="chk2" />
      </div>
      <div class="multi-input-example example col">
        Input Group
        <hr />
        <InputGroup>
          <InputGroupLabel text="First & Last Name:" />
          <BasicInput v-model="text" />
          <BasicInput v-model="text2" />
        </InputGroup>
      </div>
      <div class="popovers-example example col">
        Popovers
        <hr />
        <div class="row">
          <div class="col-3">
            <button
              type="button"
              class="btn btn-secondary"
              v-popover="{
                placement: 'top',
                title: 'This is the title',
                content: 'And here\'s some amazing content. It\'s very engaging. Right?',
              }"
            >
              Popover on top
            </button>
          </div>
          <div class="col-3">
            <button
              type="button"
              class="btn btn-secondary"
              v-popover="{
                placement: 'right',
                title: 'This is the title',
                content: 'And here\'s some amazing content. It\'s very engaging. Right?',
              }"
            >
              Popover on right
            </button>
          </div>
          <div class="col-3">
            <button
              type="button"
              class="btn btn-secondary"
              v-popover="{
                placement: 'bottom',
                title: 'This is the title',
                content: 'And here\'s some amazing content. It\'s very engaging. Right?',
              }"
            >
              Popover on bottom
            </button>
          </div>
          <div class="col-3">
            <button
              type="button"
              class="btn btn-secondary"
              v-popover="{
                placement: 'left',
                title: 'This is the title',
                content: 'And here\'s some amazing content. It\'s very engaging. Right?',
              }"
            >
              Popover on left
            </button>
          </div>
        </div>
      </div>
      <div class="tooltips-example example col">
        Tooltips
        <hr />
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-secondary"
              v-tooltip="{
                placement: 'top',
                text: 'This is the title',
              }"
            >
              Tooltip on top
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-secondary"
              v-tooltip="{
                placement: 'right',
                text: 'This is the title',
              }"
            >
              Tooltip on right
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-secondary"
              v-tooltip="{
                placement: 'bottom',
                text: 'This is the title',
              }"
            >
              Tooltip on bottom
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-secondary"
              v-tooltip="{
                placement: 'left',
                text: 'This is the title',
              }"
            >
              Tooltip on left
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary" v-tooltip:text="htmlTooltip">Tooltip with HTML</button>
          </div>
        </div>
      </div>
      <div class="accordion-example example col">
        Accordion
        <hr />
        <Accordion>
          <AccordionItem title="Accordion Item #1">
            Placeholder content for this accordion, which is intended to demonstrate the
            <code>.accordion-flush</code> class. This is the first item's accordion body.
          </AccordionItem>
          <AccordionItem title="Accordion Item #2">
            Placeholder content for this accordion, which is intended to demonstrate the
            <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being
            filled with some actual content.
          </AccordionItem>
          <AccordionItem title="Accordion Item #3" default-open>
            Placeholder content for this accordion, which is intended to demonstrate the
            <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting
            happening here in terms of content, but just filling up the space to make it look, at least at first glance,
            a bit more representative of how this would look in a real-world application.
          </AccordionItem>
        </Accordion>
      </div>
      <div class="card-example example col">
        Cards
        <hr />
        <Card>
          <template v-slot:header>With Header</template>
          Nothing else
        </Card>
        <Card>
          <template v-slot:footer>With Footer</template>
          Nothing else
        </Card>
        <Card>
          <template v-slot:title>This is the title</template>
          <template v-slot:text>This is the card text.</template>
          <button type="button" class="btn btn-primary">Outside Text</button>
        </Card>
      </div>
    </div>
    <div class="row">
      <div class="list-group-example example col">
        <div class="row">
          <div class="col">
            List Groups
            <hr />
            <List>
              <ListItem
                v-for="item of smallList"
                :key="item.value"
                :text="item.text"
                :color="item.color"
                :active="isSelected(item)"
              />
            </List>
          </div>
          <div class="col">
            Custom List
            <hr />
            <List>
              <ListItem
                v-for="item of xtraSmallList"
                :key="item.value"
                action
                class="p-0"
                :active="isSelected(item)"
                :color="item.color"
                @click="selectedItem = item"
              >
                <div class="d-flex justify-content-start align-items-start">
                  <img :src="item.image" class="card-img card-img-start" alt="..." />
                  <div class="px-3 pt-1 pb-3">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ item.text }}</h5>
                      <small
                        :class="{
                          'text-muted': !isSelected(item) && !item.color,
                          'text-body': !isSelected(item) && !!item.color,
                          'text-light-emphasis': isSelected(item),
                        }"
                        >{{ item.year }}</small
                      >
                    </div>
                    <p class="mb-1">{{ item.overview }}</p>
                    <small
                      :class="{
                        'text-muted': !isSelected(item) && !item.color,
                        'text-body': !isSelected(item) && !!item.color,
                        'text-light-emphasis': isSelected(item),
                      }"
                      >Rated: {{ item.rating }}</small
                    >
                  </div>
                </div>
              </ListItem>
            </List>
          </div>
          <div class="col">
            Action List
            <hr />
            <List>
              <ListItem
                v-for="item of smallList"
                button
                :key="item.value"
                :text="item.text"
                :active="isSelected(item)"
                @click="selectedItem = item"
              />
            </List>
          </div>
        </div>
        <div class="row">
          <div class="col">
            Horizontal List
            <hr />
            <List horizontal>
              <ListItem
                v-for="item of smallList"
                button
                :key="item.value"
                :text="item.text"
                :active="isSelected(item)"
                @click="selectedItem = item"
              />
            </List>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="toast-example example text-end col">
        <button type="button" class="btn btn-secondary" @click="showToast(false)">Show Toast</button>
        <button type="button" class="btn btn-primary" @click="showToast(false, 'primary')">Show Toast Primary</button>
        <button type="button" class="btn btn-secondary" @click="showToast(true)">Show Toast Auto-Close</button>
        <button type="button" class="btn btn-primary" @click="showToastNoHeader('primary')">
          Show Toast Auto-Close No Header
        </button>
      </div>
      <div class="modal-example example text-end col">
        <button
          type="button"
          class="btn btn-secondary"
          @click="showModal('Modal Title', 'This is a standard modal.', true, false, 'secondary')"
        >
          Show Modal
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="showModal('Confirm Title', 'This is a confirm modal. Please answer Yes or No.', false, true)"
        >
          Show Confirm
        </button>
      </div>
    </div>
    <ToastContainer bottom-right />
    <Modal ref="modal" :options="modalOptions" @confirm="onModalConfirm()" @cancel="onModalCancel()">
      <template v-slot:footer>
        <button
          v-if="customModalFooter"
          type="button"
          class="btn"
          :class="{ [`btn-${modalOptions.color || 'secondary'}`]: true }"
          @click="customModalClose()"
        >
          OK
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import {
  Accordion,
  AccordionItem,
  AutoComplete,
  BasicInput,
  Card,
  Checkbox,
  DropDown,
  InputGroup,
  InputGroupLabel,
  List,
  ListItem,
  Modal,
  Paginator,
  RadioButton,
  RadioGroup,
  ToastContainer,
  TextInput,
  ToggleSwitch,
  vPopover,
  vTooltip,
  getPagingOptions,
  useToasts,
  getModalProps,
} from './common';

const fetchMovies = async () => {
  const response = await fetch('/json/movies.json');
  const movies = await response.json();
  const colors = ['', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    let cIx = i;
    if (cIx >= colors.length) cIx = 0;
    movie.color = colors[cIx];
    movie.text = movie.title;
    movie.value = movie['sort-title'];
  }
  itemsToSelect.value = movies;
  paginatorOptions.value = { ...paginatorOptions.value, items: movies };
};
onMounted(() => fetchMovies());
const { addToast, addToastMessage } = useToasts();
const text = ref('');
const text2 = ref('');
const autoCompleteText = ref('');
const selectedItem = ref<any>(null);
const itemsToSelect = ref<any[]>([]);
const smallList = computed(() => itemsToSelect.value.slice(0, 9));
const xtraSmallList = computed(() => itemsToSelect.value.slice(0, 4));
const chk1 = ref(false);
const chk2 = ref(false);
const paginatorOptions = ref(getPagingOptions());
const isSelected = (item: { value: string }) => {
  return !!item && !!selectedItem.value && item.value === selectedItem.value.value;
};
const htmlTooltip = ref({ hasHtml: true, text: '<em>Tooltip</em> <u>with</u> <b>HTML</b>' });
const modal = ref<any>(null);
const customModalFooter = ref(false);
const modalOptions = ref(getModalProps());

const showToast = (autoclose: boolean, color = '') => {
  if (!!color) {
    addToast({
      id: '',
      message: 'This is a toast message',
      title: 'Toast Title',
      time: new Date().toISOString(),
      color,
      autoclose,
    });
  } else {
    addToastMessage('This is a toast message', 'Toast Title', new Date().toISOString(), autoclose);
  }
};
const showToastNoHeader = (color = '') => {
  addToast({ id: '', message: 'This is a toast message.', color, dark: !!color });
};
const showModal = (title: string, message: string, closeable: boolean, confirmable: boolean, color = '') => {
  const options = { ...modalOptions.value };
  options.confirmable = confirmable;
  options.closeable = closeable;
  options.title = title;
  options.message = message;
  options.color = !!color || confirmable ? color : 'primary';
  options.contentAlign = confirmable ? 'left' : 'center';
  options.headerAlign = confirmable ? 'left' : 'center';
  options.footerAlign = confirmable ? 'right' : 'center';
  options.cancelText = confirmable ? 'No' : 'Cancel';
  options.confirmText = confirmable ? 'Yes' : 'OK';
  options.dark = !!options.color;
  customModalFooter.value = !confirmable;
  modalOptions.value = options;
  nextTick(() => modal.value.open());
};
const customModalClose = () => {
  modal.value.close();
};
const onModalConfirm = () => {
  setTimeout(() => showModal('Confirm Modal', 'You answered Yes', true, false), 200);
};
const onModalCancel = () => {
  if (modalOptions.value.confirmable) {
    setTimeout(() => showModal('Confirm Modal', 'You answered No.', true, false), 200);
  }
};
</script>

<style scoped lang="scss">
.main-content {
  height: calc(100% - 56px);
  overflow: scroll;
}
.text-input-example {
  margin-top: 1rem;
}

.example {
  margin-top: 1rem;
  padding: 1rem;
  border: solid 1px #9e9e9e;
  border-radius: 0.25rem;
  min-width: 500px;
  text-align: left;
  .model {
    text-align: left;
  }
}

.list-group-example {
  .card-img {
    max-width: 100px;
  }
}

.toast-example,
.modal-example {
  button.btn {
    margin-left: 0.5rem;
  }
}

.card-example {
  .card {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
}

.paginator-example {
  .list-group {
    text-align: left;
  }
  .paginator {
    margin-top: 1rem;
  }
}
</style>
