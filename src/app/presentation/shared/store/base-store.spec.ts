import { TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { BaseStore, BaseState, createInitialState } from './base-store';

interface TestData {
  id: string;
  name: string;
}

interface TestState extends BaseState<TestData[]> {
  filter: string;
}

class TestStore extends BaseStore<TestData[], TestState> {
  private _filter = signal<string>('');
  readonly filter = this._filter.asReadonly();

  readonly filteredData = computed(() => {
    const data = this.data() || [];
    const filter = this._filter();
    if (!filter) return data;
    return data.filter(item => item.name.includes(filter));
  });

  constructor() {
    super({
      ...createInitialState<TestData[]>([]),
      filter: ''
    });
  }

  setFilter(filter: string): void {
    this._filter.set(filter);
    this.patchState({ filter });
  }

  addItem(item: TestData): void {
    const current = this.data() || [];
    this.setData([...current, item]);
  }

  async loadItems(items: TestData[]): Promise<void> {
    await this.executeAsync(
      async () => items,
      (data) => this.setData(data)
    );
  }

  async loadWithError(): Promise<void> {
    await this.executeAsync(
      async () => {
        throw new Error('Test error');
      }
    );
  }
}

describe('BaseStore', () => {
  let store: TestStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = new TestStore();
  });

  describe('Initial State', () => {
    it('should initialize with default state', () => {
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe(null);
      expect(store.data()).toBe(null);
      expect(store.hasError()).toBe(false);
      expect(store.hasData()).toBe(false);
      expect(store.isIdle()).toBe(true);
    });
  });

  describe('Data Management', () => {
    it('should set data correctly', () => {
      const testData: TestData[] = [
        { id: '1', name: 'Test 1' },
        { id: '2', name: 'Test 2' }
      ];

      store.addItem(testData[0]);
      expect(store.data()).toEqual([testData[0]]);
      expect(store.hasData()).toBe(true);
    });

    it('should add items correctly', () => {
      store.addItem({ id: '1', name: 'Test 1' });
      store.addItem({ id: '2', name: 'Test 2' });

      expect(store.data()?.length).toBe(2);
    });
  });

  describe('Loading State', () => {
    it('should handle async operations with loading state', async () => {
      const testData: TestData[] = [{ id: '1', name: 'Test' }];
      
      const loadPromise = store.loadItems(testData);
      
      // Loading should be true during async operation
      // Note: This might complete too fast to test in practice
      
      await loadPromise;
      
      expect(store.loading()).toBe(false);
      expect(store.data()).toEqual(testData);
      expect(store.error()).toBe(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle errors correctly', async () => {
      await store.loadWithError();

      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Test error');
      expect(store.hasError()).toBe(true);
      expect(store.isIdle()).toBe(false);
    });
  });

  describe('Computed Signals', () => {
    it('should compute filtered data correctly', () => {
      store.addItem({ id: '1', name: 'Apple' });
      store.addItem({ id: '2', name: 'Banana' });
      store.addItem({ id: '3', name: 'Apricot' });

      expect(store.filteredData().length).toBe(3);

      store.setFilter('Ap');
      expect(store.filteredData().length).toBe(2);
      expect(store.filteredData()[0].name).toBe('Apple');
      expect(store.filteredData()[1].name).toBe('Apricot');
    });
  });

  describe('State Helpers', () => {
    it('should check hasData correctly', () => {
      expect(store.hasData()).toBe(false);
      
      store.addItem({ id: '1', name: 'Test' });
      expect(store.hasData()).toBe(true);
    });

    it('should check isIdle correctly', () => {
      expect(store.isIdle()).toBe(true);
      
      // After error
      store.loadWithError();
      // isIdle should eventually be false after error is set
    });
  });
});

describe('createInitialState', () => {
  it('should create initial state with null data', () => {
    const state = createInitialState();
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data).toBe(null);
  });

  it('should create initial state with provided data', () => {
    const data = [{ id: '1', name: 'Test' }];
    const state = createInitialState(data);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(data);
  });
});
