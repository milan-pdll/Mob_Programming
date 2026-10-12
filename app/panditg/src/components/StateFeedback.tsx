import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { AlertCircle, RefreshCw, Sparkles, Inbox } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing } from '../constants/theme';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Connecting to Sanskriti backend...' }) => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color={SanskritiColors.maroon} />
    <Text style={styles.loadingText}>{message}</Text>
    <Text style={styles.subtleText}>Authentic Cultural Services</Text>
  </View>
);

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Unable to connect to the Sanskriti backend.',
  onRetry,
}) => (
  <View style={styles.centerContainer}>
    <View style={styles.errorIconWrap}>
      <AlertCircle size={32} color={SanskritiColors.maroon} />
    </View>
    <Text style={styles.errorTitle}>Connection Issue</Text>
    <Text style={styles.errorText}>{message}</Text>
    <Text style={styles.hintText}>
      Make sure the FastAPI server is running (`uvicorn app.main:app --reload` on port 8000).
    </Text>
    <Pressable
      onPress={onRetry}
      style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
    >
      <RefreshCw size={16} color={SanskritiColors.white} />
      <Text style={styles.retryButtonText}>Retry Connection</Text>
    </Pressable>
  </View>
);

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  message = 'Try adjusting your filters or search keywords.',
  actionText,
  onAction,
}) => (
  <View style={styles.centerContainer}>
    <View style={styles.emptyIconWrap}>
      <Inbox size={32} color={SanskritiColors.earthBrown} />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyMessage}>{message}</Text>
    {actionText && onAction && (
      <Pressable
        onPress={onAction}
        style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
      >
        <Sparkles size={16} color={SanskritiColors.white} />
        <Text style={styles.actionButtonText}>{actionText}</Text>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: 15,
    fontWeight: '600',
    color: SanskritiColors.primaryText,
  },
  subtleText: {
    marginTop: 4,
    fontSize: 12,
    color: SanskritiColors.mutedText,
  },
  errorIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FDEEE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 14,
    color: SanskritiColors.secondaryText,
    textAlign: 'center',
    marginBottom: 6,
  },
  hintText: {
    fontSize: 12,
    color: SanskritiColors.mutedText,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: 280,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SanskritiColors.maroon,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Radii.button,
  },
  retryButtonText: {
    color: SanskritiColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F9EFE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    marginBottom: 6,
  },
  emptyMessage: {
    fontSize: 14,
    color: SanskritiColors.secondaryText,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: 280,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SanskritiColors.maroon,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: Radii.button,
  },
  actionButtonText: {
    color: SanskritiColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
