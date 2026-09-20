import { useSyncExternalStore } from 'react';
import { cmsStore } from './cmsStore';

export function useCMS() {
  const state = useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getSnapshot,
    cmsStore.getSnapshot
  );

  return {
    ...state,
    login: cmsStore.login,
    logout: cmsStore.logout,
    addProject: cmsStore.addProject.bind(cmsStore),
    updateProject: cmsStore.updateProject.bind(cmsStore),
    deleteProject: cmsStore.deleteProject.bind(cmsStore),
    reorderProjects: cmsStore.reorderProjects.bind(cmsStore),
    moveProject: cmsStore.moveProject.bind(cmsStore),
    toggleFeatured: cmsStore.toggleFeatured.bind(cmsStore),
    addGalleryImage: cmsStore.addGalleryImage.bind(cmsStore),
    removeGalleryImage: cmsStore.removeGalleryImage.bind(cmsStore),
    reorderGalleryImages: cmsStore.reorderGalleryImages.bind(cmsStore),
    moveGalleryImage: cmsStore.moveGalleryImage.bind(cmsStore),
    addBrand: cmsStore.addBrand.bind(cmsStore),
    removeBrand: cmsStore.removeBrand.bind(cmsStore),
    updateSettings: cmsStore.updateSettings.bind(cmsStore),
    exportBackupJSON: cmsStore.exportBackupJSON.bind(cmsStore),
    importBackupJSON: cmsStore.importBackupJSON.bind(cmsStore),
    generatePortfolioDataCode: cmsStore.generatePortfolioDataCode.bind(cmsStore),
    generateGalleryImagesCode: cmsStore.generateGalleryImagesCode.bind(cmsStore),
    resetToDefaults: cmsStore.resetToDefaults.bind(cmsStore),
  };
}

