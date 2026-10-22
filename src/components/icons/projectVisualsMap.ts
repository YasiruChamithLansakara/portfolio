import {
  BusSeatVisual,
  DeforestationVisual,
  HeartDiseaseVisual,
  MediAssistVisual,
  NeurixaVisual,
  SegmentationVisual,
  UrbanizationVisual,
  VoiceEmotionVisual,
  type Visual,
} from './ProjectVisuals'

export const projectVisuals: Record<string, Visual> = {
  'mediassist-bot': MediAssistVisual,
  'urbanization-kurunegala': UrbanizationVisual,
  'voice-emotion-classification': VoiceEmotionVisual,
  'bus-seat-booking': BusSeatVisual,
  neurixa: NeurixaVisual,
  'heart-disease-prediction': HeartDiseaseVisual,
  'strawberry-segmentation': SegmentationVisual,
  'deforestation-matale': DeforestationVisual,
}
